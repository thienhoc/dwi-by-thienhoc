# Languages

Dwi keeps English as the canonical operational documentation and Vietnamese as the first complete translation. Documentation patch `0.2.1` adds localized entry points for five additional languages.

| Language | Entry point | Coverage in 0.2.1 |
| --- | --- | --- |
| English | [README.md](README.md) | Canonical operational documentation |
| Vietnamese | [README.vi.md](README.vi.md) | Complete translated documentation surface |
| Japanese | [README.ja.md](README.ja.md) | Localized introduction, module selection, safe-trial guidance, and status |
| Korean | [README.ko.md](README.ko.md) | Localized introduction, module selection, safe-trial guidance, and status |
| Simplified Chinese | [README.zh-CN.md](README.zh-CN.md) | Localized introduction, module selection, safe-trial guidance, and status |
| French | [README.fr.md](README.fr.md) | Localized introduction, module selection, safe-trial guidance, and status |
| Hindi | [README.hi.md](README.hi.md) | Localized introduction, module selection, safe-trial guidance, and status |

## Translation boundary

The five new language entry points are intentionally bounded. Until deeper documentation is translated and reviewed, use English for exact installation commands, paths, hashes, module contracts, safety language, architecture, evidence policy, and release procedures.

Do not translate or localize:

- shell commands
- repository paths
- SHA-256 values
- module identifiers
- evidence labels such as `VERIFIED`, `OBSERVED`, `ESTIMATED`, `TARGET`, and `UNKNOWN`
- license identifiers

A translation must not broaden compatibility, performance, savings, safety, or evidence claims beyond the canonical English source.
