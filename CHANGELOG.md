# Changelog

All notable repository changes are recorded here.

## Unreleased

## 0.2.1 - 2026-07-26

### Added

- Added localized repository entry documentation in Japanese, Korean, Simplified Chinese, French, and Hindi.
- Added `LANGUAGES.md` to define language coverage and the translation boundary.
- Added the documentation-only release record for `v0.2.1`.

### Changed

- Expanded public documentation access without changing module behavior, installation paths, compatibility claims, evidence policy, or licensing.
- Kept English as the canonical operational source and Vietnamese as the first complete translated documentation surface.

### Release truth

- Intended release tag: `v0.2.1`
- Included installable modules: unchanged from `v0.2.0`
- Runtime and module contract changes: none
- Release record: [docs/releases/v0.2.1.md](docs/releases/v0.2.1.md)

## 0.2.0 - 2026-07-25

### Added

- Added an optional All-in-One composition module on the development branch.
- Added a repository module catalog as the single machine-readable module inventory.
- Added bounded compatibility evidence records for Codex and Claude Code.
- Added behavioral regression fixtures for focused modules and All-in-One.

### Changed

- Released the optional All-in-One composition module in `v0.2.0`.
- Separated the historical `v0.1.0` focused-module release truth from the `v0.2.0` composition release.
- Refactored All-in-One to select only relevant lenses and preserve a silent fast path.
- Expanded repository validation to cover semantic module surfaces, EN/VI parity, release truth, issue forms, examples, and table shape.
- Replaced project-specific actor wording in public Bridge guidance with an authorized decision-owner role.

### Fixed

- Corrected stale private/public, tag, license, roadmap, and contribution status.
- Corrected the malformed All-in-One row and wording in `MODULES.vi.md`.
- Removed the unsupported umbrella claim that Dwi was generally "tested with Claude and Codex".
- Added the missing All-in-One examples and issue-form options.

### Release truth

- Release tag: `v0.2.0`
- Included installable modules: six focused modules and optional All-in-One
- Release record: [docs/releases/v0.2.0.md](docs/releases/v0.2.0.md)

## 0.1.0 - 2026-07-25

### Added

- Published six independent focused Agent Skills: Conduct, Lean, Budget, Bridge, Arc, and Evidence.
- Added English and Vietnamese entry documentation.
- Added inspect-first installation, exact removal, safety, evidence, brand, governance, support, and contribution guidance.
- Added original SVG brand sources and a repository-only architecture diagram.
- Added a dependency-free offline repository contract checker.
- Added least-privilege GitHub Actions validation.
- Added Apache-2.0 for code and operational files, CC BY 4.0 for documentation and original assets, and a separate trademark policy.
- Added pinned per-module install URLs and SHA-256 verification for the six focused modules.
- Added a reproducible social-preview export receipt.

### Removed

- Removed Next.js, Vite, Cloudflare, static landing-page, Sites hosting, deployment, telemetry, and generated website audit material from the public repository boundary.

### Release truth

- Release tag: `v0.1.0`
- Included installable modules: six focused modules
- Excluded from the release: `dwi-all-in-one`
- Release record: [docs/releases/v0.1.0.md](docs/releases/v0.1.0.md)
