const TOP_LEVEL_KEYS = new Set(["interface", "policy"]);
const INTERFACE_KEYS = new Set([
  "display_name",
  "short_description",
  "brand_color",
  "default_prompt",
]);

function error(sourcePath, lineNumber, message) {
  const location = lineNumber ? `${sourcePath}:${lineNumber}` : sourcePath;
  return new Error(`${location}: ${message}`);
}

function assertUnicodeScalarString(value, sourcePath, lineNumber) {
  for (let index = 0; index < value.length; index += 1) {
    const codeUnit = value.charCodeAt(index);
    if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) {
        throw error(sourcePath, lineNumber, "Unicode text contains a lone surrogate");
      }
      index += 1;
    } else if (codeUnit >= 0xdc00 && codeUnit <= 0xdfff) {
      throw error(sourcePath, lineNumber, "Unicode text contains a lone surrogate");
    }
  }
}

function parseEntry(body, sourcePath, lineNumber) {
  const doubleQuoted = body.match(/^"((?:[^"\\]|\\.)*)" *:(.*)$/);
  if (doubleQuoted) {
    let key;
    try {
      key = JSON.parse(`"${doubleQuoted[1]}"`);
    } catch {
      throw error(sourcePath, lineNumber, "invalid double-quoted YAML key");
    }
    assertUnicodeScalarString(key, sourcePath, lineNumber);
    return { key, rest: doubleQuoted[2], quoted: true };
  }

  const singleQuoted = body.match(/^'((?:[^']|'')*)' *:(.*)$/);
  if (singleQuoted) {
    const key = singleQuoted[1].replace(/''/g, "'");
    assertUnicodeScalarString(key, sourcePath, lineNumber);
    return { key, rest: singleQuoted[2], quoted: true };
  }

  const plain = body.match(/^([A-Za-z_][A-Za-z0-9_-]*) *:(.*)$/);
  return plain ? { key: plain[1], rest: plain[2], quoted: false } : null;
}

function validateTrailingComment(trailing, sourcePath, lineNumber) {
  if (trailing === "" || /^ +$/.test(trailing) || /^ +#.*$/.test(trailing)) {
    return;
  }
  throw error(sourcePath, lineNumber, "content follows a quoted scalar");
}

function validateQuotedScalar(value, quote, sourcePath, lineNumber) {
  if (quote === '"') {
    let escaped = false;
    for (let index = 1; index < value.length; index += 1) {
      const character = value[index];
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        const scalar = value.slice(0, index + 1);
        validateTrailingComment(value.slice(index + 1), sourcePath, lineNumber);
        let decoded;
        try {
          decoded = JSON.parse(scalar);
        } catch {
          throw error(sourcePath, lineNumber, "invalid double-quoted YAML scalar");
        }
        assertUnicodeScalarString(decoded, sourcePath, lineNumber);
        return;
      }
    }
  } else {
    for (let index = 1; index < value.length; index += 1) {
      if (value[index] !== "'") continue;
      if (value[index + 1] === "'") {
        index += 1;
        continue;
      }
      const decoded = value.slice(1, index).replace(/''/g, "'");
      assertUnicodeScalarString(decoded, sourcePath, lineNumber);
      validateTrailingComment(value.slice(index + 1), sourcePath, lineNumber);
      return;
    }
  }
  throw error(sourcePath, lineNumber, "multiline quoted scalars are not supported");
}

function validatePlainScalar(value, sourcePath, lineNumber) {
  const commentIndex = value.search(/ +#/);
  const scalar = (commentIndex === -1 ? value : value.slice(0, commentIndex)).trimEnd();

  if (scalar === "") {
    throw error(sourcePath, lineNumber, "plain scalar must not be empty");
  }
  if (/^[\-?:,\[\]{}#&*!|>'"%@`]/.test(scalar)) {
    throw error(sourcePath, lineNumber, "unsupported plain scalar indicator");
  }
  if (/:(?:\s|$)/.test(scalar)) {
    throw error(sourcePath, lineNumber, "plain scalar contains an unsafe mapping separator");
  }
}

function classifyValue(rest, sourcePath, lineNumber) {
  if (rest === "") return "mapping";
  if (/^ +#.*$/.test(rest)) return "mapping";
  if (!/^ +/.test(rest)) {
    throw error(sourcePath, lineNumber, "a mapping value must be separated from its colon");
  }

  const value = rest.trimStart();
  if (/^[|>]/.test(value)) {
    throw error(sourcePath, lineNumber, "block scalars are not supported");
  }
  if (/^[\[{]/.test(value)) {
    throw error(sourcePath, lineNumber, "flow collections are not supported");
  }
  if (/^[&*!]/.test(value)) {
    throw error(sourcePath, lineNumber, "anchors, aliases, and custom tags are not supported");
  }
  if (value.startsWith('"')) {
    validateQuotedScalar(value, '"', sourcePath, lineNumber);
  } else if (value.startsWith("'")) {
    validateQuotedScalar(value, "'", sourcePath, lineNumber);
  } else {
    validatePlainScalar(value, sourcePath, lineNumber);
  }
  return "scalar";
}

export function validateCodexMetadata(source, sourcePath) {
  if (typeof source !== "string") {
    throw new TypeError(`${sourcePath}: metadata must be UTF-8 text`);
  }
  if (source.startsWith("\uFEFF")) {
    throw error(sourcePath, null, "UTF-8 BOM is not supported");
  }
  if (source.includes("\t")) {
    throw error(sourcePath, null, "tabs are not supported in Codex metadata");
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/.test(source)) {
    throw error(sourcePath, null, "control characters are not supported in Codex metadata");
  }
  assertUnicodeScalarString(source, sourcePath, null);

  const stack = [];
  const records = [];
  for (const [index, line] of source.split(/\r?\n/).entries()) {
    const lineNumber = index + 1;
    if (/^ *$/.test(line) || /^ *#/.test(line)) continue;

    const whitespace = line.match(/^ */)?.[0] ?? "";
    const indent = whitespace.length;
    const body = line.slice(indent);
    if (indent === 0 && (/^(?:---|\.\.\.)(?:\s|$)/.test(body) || body.startsWith("%"))) {
      throw error(sourcePath, lineNumber, "directives and document markers are not supported");
    }
    if (/^(?:-\s|\?\s|:\s)/.test(body)) {
      throw error(sourcePath, lineNumber, "sequences and explicit mapping keys are not supported");
    }

    while (stack.length && stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1) ?? null;
    const entry = parseEntry(body, sourcePath, lineNumber);
    if (!entry) throw error(sourcePath, lineNumber, "unsupported YAML syntax");
    const kind = classifyValue(entry.rest, sourcePath, lineNumber);
    const record = { ...entry, kind, indent, line, lineNumber, parent };
    records.push(record);
    if (kind === "mapping") stack.push({ key: entry.key, indent });
  }

  const top = records.filter((record) => record.parent === null);
  if (top.length !== 2 || top.some((record) => !TOP_LEVEL_KEYS.has(record.key))) {
    throw error(sourcePath, null, "expected exactly the top-level interface and policy blocks");
  }

  for (const key of TOP_LEVEL_KEYS) {
    const matches = top.filter((record) => record.key === key);
    if (matches.length !== 1 || matches[0].quoted || matches[0].kind !== "mapping") {
      throw error(sourcePath, null, `${key} must be one unquoted top-level block mapping`);
    }
  }

  const childrenOf = (key) => records.filter(
    (record) => record.parent?.key === key && record.parent.indent === 0,
  );
  const interfaceChildren = childrenOf("interface");
  const interfaceKeys = new Set();
  for (const child of interfaceChildren) {
    if (
      child.indent !== 2 || child.quoted || child.kind !== "scalar" ||
      !INTERFACE_KEYS.has(child.key) || interfaceKeys.has(child.key)
    ) {
      throw error(sourcePath, child.lineNumber, "interface contains an unsupported or duplicate field");
    }
    interfaceKeys.add(child.key);
  }
  if (!interfaceKeys.has("display_name")) {
    throw error(sourcePath, null, "interface.display_name is required");
  }

  const policyChildren = childrenOf("policy");
  if (policyChildren.length !== 1 || policyChildren[0].key !== "allow_implicit_invocation") {
    throw error(sourcePath, null, "policy must contain only allow_implicit_invocation");
  }
  const declaration = policyChildren[0];
  if (
    declaration.indent !== 2 || declaration.quoted || declaration.kind !== "scalar" ||
    !/^  allow_implicit_invocation: +false(?: +#.*)? *$/.test(declaration.line)
  ) {
    throw error(
      sourcePath,
      declaration.lineNumber,
      "policy.allow_implicit_invocation must be an unquoted direct child with YAML boolean false",
    );
  }
}
