#!/usr/bin/env node

import assert from "node:assert/strict";
import { validateCodexMetadata } from "./install-module.mjs";

const validFixtures = new Map([
  [
    "canonical metadata",
    [
      "interface:",
      '  display_name: "Dwi • Conduct"',
      '  short_description: "Clear, kind, answerable agent communication"',
      '  brand_color: "#FF4F2E"',
      '  default_prompt: "Use $dwi-conduct explicitly."',
      "policy:",
      "  allow_implicit_invocation: false",
      "",
    ].join("\n"),
  ],
  [
    "separated comment",
    [
      "interface:",
      "  display_name: Dwi",
      "policy:",
      "  allow_implicit_invocation: false # explicit only",
      "",
    ].join("\n"),
  ],
]);

for (const [name, fixture] of validFixtures) {
  assert.doesNotThrow(
    () => validateCodexMetadata(fixture, `${name}/agents/openai.yaml`),
    `Codex metadata validator rejected ${name}`,
  );
}

const malformedFixtures = new Map([
  [
    "multiline double-quoted scalar",
    'foo: "text\npolicy:\n  allow_implicit_invocation: false\n"\n',
  ],
  [
    "multiline single-quoted scalar",
    "foo: 'text\npolicy:\n  allow_implicit_invocation: false\n'\n",
  ],
  [
    "literal block scalar",
    "foo: |\n  policy:\n    allow_implicit_invocation: false\n",
  ],
  [
    "folded block scalar",
    "foo: >\n  policy:\n    allow_implicit_invocation: false\n",
  ],
  [
    "unseparated comment marker",
    "policy:\n  allow_implicit_invocation: false#note\n",
  ],
  [
    "flow mapping",
    "policy: { allow_implicit_invocation: false }\n",
  ],
  [
    "flow sequence",
    "interface: [policy, allow_implicit_invocation]\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "anchor",
    "defaults: &defaults false\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "alias",
    "defaults: false\npolicy:\n  allow_implicit_invocation: *defaults\n",
  ],
  [
    "custom tag",
    "policy:\n  allow_implicit_invocation: !bool false\n",
  ],
  [
    "document start",
    "---\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "second document",
    "policy:\n  allow_implicit_invocation: false\n---\npolicy:\n  allow_implicit_invocation: true\n",
  ],
  [
    "directive",
    "%YAML 1.2\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "sequence item",
    "- policy:\n    allow_implicit_invocation: false\n",
  ],
  [
    "explicit mapping key",
    "? policy\n: allow_implicit_invocation: false\n",
  ],
  [
    "UTF-8 BOM",
    "\uFEFFpolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "unknown top-level key",
    "interface:\n  display_name: Dwi\nextra: value\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "scalar interface",
    "interface: Dwi\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "duplicate interface field",
    "interface:\n  display_name: Dwi\n  display_name: Other\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "unknown interface field",
    "interface:\n  display_name: Dwi\n  hidden_behavior: enabled\npolicy:\n  allow_implicit_invocation: false\n",
  ],
  [
    "extra policy child",
    "interface:\n  display_name: Dwi\npolicy:\n  allow_implicit_invocation: false\n  another_control: true\n",
  ],
]);

for (const [name, fixture] of malformedFixtures) {
  assert.throws(
    () => validateCodexMetadata(fixture, `${name}/agents/openai.yaml`),
    Error,
    `Codex metadata validator accepted ${name}`,
  );
}

console.log(
  `Adversarial Codex metadata validation passed for ${validFixtures.size} valid and ${malformedFixtures.size} rejected fixtures.`,
);
