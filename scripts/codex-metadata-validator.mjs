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

function parseEntry(body, sourcePath, lineNumber) {
  const doubleQuoted = body.match(/^"((?:[^"\\]|\\.)*)"\s*:(.*)$/);
  if (doubleQuoted) {
    let key;
    try {
      key = JSON.parse(`"${doubleQuoted[1]}"`);
    } catch {
      throw error(sourcePath, lineNumber, "invalid double-quoted YAML key");
    }
    return { key, rest: doubleQuoted[2], quoted: true };
  }

  const singleQuoted = body.match(/^'((?:[^']|'')*)'\s*:(.*)$/);
  if (singleQuoted) {
    return {
      key: singleQuoted[1].replace(/''/g, "'"),
      rest: singleQuoted[2],
      quoted: true,
    };
  }

  const plain = body.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:(.*)$/);
  return plain ? { key: plain[1], rest: plain[2], quoted: false } : null;
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
        const trailing = value.slice(index + 1);
        if (!/^\s*(?:#.*)?$/.test(trailing)) {
          throw error(sourcePath, lineNumber, "content follows a quoted scalar");
        }
        try {
          JSON.parse(scalar);
        } catch {
          throw error(sourcePath, lineNumber, "invalid double-quoted YAML scalar");
        }
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
      if (!/^\s*(?:#.*)?$/.test(value.slice(index + 1))) {
        throw error(sourcePath, lineNumber, "content follows a quoted scalar");
      }
      return;
    }
  }
  throw error(sourcePath, lineNumber, "multiline quoted scalars are not supported");
}

function classifyValue(rest, sourcePath, lineNumber) {
  const value = rest.trimStart();
  if (value === "" || value.startsWith("#")) return "mapping";
  if (/^[|>]/.test(value)) {
    throw error(sourcePath, lineNumber, "block scalars are not supported");
  }
  if (/^[\[{]/.test(value)) {
    throw error(sourcePath, lineNumber, "flow collections are not supported");
  }
  if (/^[&*!]/.test(value)) {
    throw error(sourcePath, lineNumber, "anchors, aliases, and custom tags are not supported");
  }
  if (value.startsWith('"')) validateQuotedScalar(value, '"', sourcePath, lineNumber);
  if (value.startsWith("'")) validateQuotedScalar(value, "'", sourcePath, lineNumber);
  return "scalar";
}

export function validateCodexMetadata(source, sourcePath) {
  if (typeof source !== "string") {
    throw new TypeError(`${sourcePath}: metadata must be UTF-8 text`);
  }
  if (source.startsWith("\uFEFF")) {
    throw error(sourcePath, null, "UTF-8 BOM is not supported");
  }

  const stack = [];
  const records = [];
  for (const [index, line] of source.split(/\r?\n/).entries()) {
    const lineNumber = index + 1;
    if (/^\s*$/.test(line) || /^\s*#/.test(line)) continue;

    const whitespace = line.match(/^[ \t]*/)?.[0] ?? "";
    if (whitespace.includes("\t")) {
      throw error(sourcePath, lineNumber, "tabs are not allowed in indentation");
    }
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
    !/^  allow_implicit_invocation:\s*false(?:\s+#.*)?\s*$/.test(declaration.line)
  ) {
    throw error(
      sourcePath,
      declaration.lineNumber,
      "policy.allow_implicit_invocation must be an unquoted direct child with YAML boolean false",
    );
  }
}
