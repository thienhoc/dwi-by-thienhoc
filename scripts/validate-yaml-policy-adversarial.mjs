#!/usr/bin/env node

import assert from "node:assert/strict";
import { validateCodexMetadata } from "./codex-metadata-validator.mjs";

const canonical = [
  "interface:",
  '  display_name: "Dwi • Conduct"',
  '  short_description: "Clear, kind, answerable agent communication"',
  '  brand_color: "#FF4F2E"',
  '  default_prompt: "Use $dwi-conduct explicitly."',
  "policy:",
  "  allow_implicit_invocation: false",
  "",
].join("\n");

const replace = (from, to) => canonical.replace(from, to);

const validFixtures = new Map([
  ["canonical metadata", canonical],
  [
    "separated comments",
    canonical
      .replace("interface:", "interface: # public interface")
      .replace("policy:", "policy: # invocation policy")
      .replace("false", "false # explicit only"),
  ],
  ["safe plain scalar", replace('  display_name: "Dwi • Conduct"', "  display_name: Dwi Conduct")],
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
    [replace('  display_name: "Dwi • Conduct"', '  display_name: "Dwi'), /multiline quoted scalars/],
  ],
  [
    "multiline single-quoted scalar",
    [replace('  display_name: "Dwi • Conduct"', "  display_name: 'Dwi"), /multiline quoted scalars/],
  ],
  ["literal block scalar", [replace('  display_name: "Dwi • Conduct"', "  display_name: |"), /block scalars/]],
  ["folded block scalar", [replace('  display_name: "Dwi • Conduct"', "  display_name: >"), /block scalars/]],
  ["unseparated policy comment", [replace("false", "false#note"), /YAML boolean false/]],
  ["unseparated mapping comment", [replace("interface:", "interface:#note"), /separated from its colon/]],
  ["unseparated policy mapping comment", [replace("policy:", "policy:#note"), /separated from its colon/]],
  ["unseparated policy value", [replace("allow_implicit_invocation: false", "allow_implicit_invocation:false"), /separated from its colon/]],
  ["flow mapping", [replace("policy:", "policy: { allow_implicit_invocation: false }"), /flow collections/]],
  ["flow sequence", [replace('  display_name: "Dwi • Conduct"', "  display_name: [Dwi]"), /flow collections/]],
  ["anchor", [replace('  display_name: "Dwi • Conduct"', "  display_name: &name Dwi"), /anchors, aliases/]],
  ["alias", [replace('  display_name: "Dwi • Conduct"', "  display_name: *name"), /anchors, aliases/]],
  ["custom tag", [replace('  display_name: "Dwi • Conduct"', "  display_name: !text Dwi"), /anchors, aliases/]],
  ["document start", [`---\n${canonical}`, /document markers/]],
  ["second document", [`${canonical}---\n${canonical}`, /document markers/]],
  ["directive", [`%YAML 1.2\n${canonical}`, /directives/]],
  ["sequence item", [replace('  display_name: "Dwi • Conduct"', "  - display_name: Dwi"), /sequences/]],
  ["explicit mapping key", [replace('  display_name: "Dwi • Conduct"', "  ? display_name\n  : Dwi"), /explicit mapping keys/]],
  ["UTF-8 BOM", [`\uFEFF${canonical}`, /UTF-8 BOM/]],
  ["tab indentation", [replace('  display_name: "Dwi • Conduct"', '\tdisplay_name: "Dwi"'), /tabs are not supported/]],
  ["tab after colon", [replace("allow_implicit_invocation: false", "allow_implicit_invocation:\tfalse"), /tabs are not supported/]],
  ["tab before comment", [replace("false", "false\t# note"), /tabs are not supported/]],
  ["plain scalar unsafe colon", [replace('  display_name: "Dwi • Conduct"', "  display_name: a: b"), /unsafe mapping separator/]],
  ["plain scalar reserved indicator", [replace('  display_name: "Dwi • Conduct"', "  display_name: @value"), /unsupported plain scalar indicator/]],
  ["quoted scalar unseparated comment", [replace('"Dwi • Conduct"', '"Dwi • Conduct"#note'), /content follows a quoted scalar/]],
  ["unknown top-level key", [`${canonical}extra: value\n`, /expected exactly the top-level/]],
  ["scalar interface", [replace("interface:", "interface: Dwi"), /expected exactly the top-level/]],
  ["duplicate interface field", [replace('  display_name: "Dwi • Conduct"', '  display_name: "Dwi"\n  display_name: "Other"'), /unsupported or duplicate/]],
  ["unknown interface field", [replace('  display_name: "Dwi • Conduct"', '  display_name: "Dwi"\n  hidden_behavior: enabled'), /unsupported or duplicate/]],
  ["extra policy child", [replace("  allow_implicit_invocation: false", "  allow_implicit_invocation: false\n  another_control: true"), /policy must contain only/]],
]);

for (const [name, [fixture, expectedError]] of malformedFixtures) {
  assert.throws(
    () => validateCodexMetadata(fixture, `${name}/agents/openai.yaml`),
    expectedError,
    `Codex metadata validator did not reject ${name} for the targeted reason`,
  );
}

console.log(
  `Adversarial Codex metadata validation passed for ${validFixtures.size} valid and ${malformedFixtures.size} targeted rejected fixtures.`,
);
