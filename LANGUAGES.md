# Languages

Dwi keeps English as the canonical operational documentation and Vietnamese as the first complete translation. Documentation release `v0.2.1` added localized entry points for five additional languages. Installation-contract release `v0.2.3` corrected the complete per-harness installation path. Validation-hardening release `v0.2.4` preserves that path while tightening Codex policy validation and release-record detection.

The existing `v0.2.2` tag is a preserved non-release ref to a pre-patch commit. It is not the installation-contract release.

| Language | Entry point | Current coverage in v0.2.4 |
| --- | --- | --- |
| English | [README.md](README.md) | Canonical operational documentation, corrected installation path, and current validation guidance |
| Vietnamese | [README.vi.md](README.vi.md) | Complete translated documentation surface, corrected installation path, and current validation guidance |
| Japanese | [README.ja.md](README.ja.md) | Localized introduction, module selection, safe-trial guidance, and current release status |
| Korean | [README.ko.md](README.ko.md) | Localized introduction, module selection, safe-trial guidance, and current release status |
| Simplified Chinese | [README.zh-CN.md](README.zh-CN.md) | Localized introduction, module selection, safe-trial guidance, and current release status |
| French | [README.fr.md](README.fr.md) | Localized introduction, module selection, safe-trial guidance, and current release status |
| Hindi | [README.hi.md](README.hi.md) | Localized introduction, module selection, safe-trial guidance, and current release status |

## Translation boundary

The five localized entry points are intentionally bounded. Until deeper documentation is translated and reviewed, use English or Vietnamese for exact installation commands, paths, hashes, module contracts, safety language, architecture, evidence policy, and release procedures.

Do not translate or localize:

- shell commands
- repository paths
- SHA-256 values
- module identifiers
- evidence labels such as `VERIFIED`, `OBSERVED`, `ESTIMATED`, `TARGET`, and `UNKNOWN`
- license identifiers

A translation must not broaden compatibility, performance, savings, safety, or evidence claims beyond the canonical English source.
