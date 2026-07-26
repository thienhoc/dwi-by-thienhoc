# Chọn một mô-đun Dwi

Dwi được thiết kế theo mô-đun. Chỉ cài hành vi nhỏ nhất giải quyết được vấn đề đang quan sát.

| Mô-đun | Chọn khi | Source chuẩn | Hướng dẫn |
| --- | --- | --- | --- |
| `dwi-conduct` | Câu hỏi khó hiểu, nặng suy nghĩ hoặc cần cách sửa sai tử tế | [`SKILL.md`](modules/dwi-conduct/SKILL.md) + [metadata Codex](modules/dwi-conduct/agents/openai.yaml) | [Conduct](docs/vi/modules/conduct.md) |
| `dwi-lean` | Kế hoạch hoặc kiểm thử đang lớn hơn việc thật | [`SKILL.md`](modules/dwi-lean/SKILL.md) + [metadata Codex](modules/dwi-lean/agents/openai.yaml) | [Lean](docs/vi/modules/lean.md) |
| `dwi-budget` | Cần ranh giới rõ cho thời gian, token hoặc vùng ngữ cảnh | [`SKILL.md`](modules/dwi-budget/SKILL.md) + [metadata Codex](modules/dwi-budget/agents/openai.yaml) | [Budget](docs/vi/modules/budget.md) |
| `dwi-bridge` | Claude và Codex gốc cần phối hợp với quyền rõ ràng | [`SKILL.md`](modules/dwi-bridge/SKILL.md) + [metadata Codex](modules/dwi-bridge/agents/openai.yaml) | [Bridge](docs/vi/modules/bridge.md) |
| `dwi-arc` | Nhiều ô công việc tách rời cần quy tắc một người ghi | [`SKILL.md`](modules/dwi-arc/SKILL.md) + [metadata Codex](modules/dwi-arc/agents/openai.yaml) | [Arc](docs/vi/modules/arc.md) |
| `dwi-evidence` | Nhận định cần trạng thái, nguồn gốc và điều chưa biết | [`SKILL.md`](modules/dwi-evidence/SKILL.md) + [metadata Codex](modules/dwi-evidence/agents/openai.yaml) | [Evidence](docs/vi/modules/evidence.md) |
| `dwi-all-in-one` | Nhiều vấn đề lặp lại cùng lúc | [`SKILL.md`](modules/dwi-all-in-one/SKILL.md) + [metadata Codex](modules/dwi-all-in-one/agents/openai.yaml) | [All-in-One](docs/vi/modules/all-in-one.md) |

## Hợp đồng độc lập

Mỗi mô-đun chuyên biệt:

- có một `SKILL.md` chuẩn tự đủ cho phần hướng dẫn hành vi;
- không cần mô-đun Dwi khác;
- nêu điều sẽ làm và điều không làm;
- không cần phần chạy Dwi riêng, tiến trình nền, gói phụ thuộc, máy chủ kết nối công cụ hoặc website;
- giữ nguyên kiểm soát quyền của lớp công cụ gốc;
- có đường gỡ chính xác.

`dwi-all-in-one` là mô-đun phối hợp tùy chọn. Chỉ dùng khi nhiều vấn đề lặp lại cùng lúc trong cùng workflow. Nó không tạo một lớp quyền mới và không được buộc mọi tác vụ chạy đủ sáu lớp.

Một bản cài explicit-only hoàn chỉnh phụ thuộc vào lớp công cụ:

- Codex cài `SKILL.md` chuẩn cùng `agents/openai.yaml`, trong đó `policy.allow_implicit_invocation` phải là khai báo boolean `false` hoạt động duy nhất.
- Claude Code cài bản được render từ `SKILL.md` chuẩn và thêm `disable-model-invocation: true` vào frontmatter.

Hãy dùng trình cài đã duyệt thay vì chỉ sao chép `SKILL.md`.

## Phạm vi cài

| Lớp công cụ | Trong dự án | Cho người dùng |
| --- | --- | --- |
| Codex | `.agents/skills/<module>/SKILL.md` + `.agents/skills/<module>/agents/openai.yaml` | `~/.agents/skills/<module>/SKILL.md` + `~/.agents/skills/<module>/agents/openai.yaml` |
| Claude Code | `.claude/skills/<module>/SKILL.md` đã render cho Claude | `~/.claude/skills/<module>/SKILL.md` đã render cho Claude |

Lần thử đầu nên dùng phạm vi dự án. Xem [hướng dẫn cài và gỡ](docs/vi/installation.md), [bảng thuật ngữ](docs/vi/glossary.md) và [ví dụ nhỏ](docs/vi/examples.md).

## Tham chiếu phiên bản

- `v0.2.4` là bản phát hành kho đã duyệt gần nhất, siết kiểm tra policy Codex và phát hiện release record theo first parent.
- `v0.2.3` vẫn là bản sửa installation contract; nội dung mô-đun và cấu trúc artifact đã cài không đổi trong `v0.2.4`.
- Tag `v0.2.2` hiện có là một ref lịch sử không phát hành trỏ tới commit trước bản vá; không dùng tag này cho trình cài đã sửa.
- Nội dung mô-đun chuẩn và mã SHA-256 không đổi so với `v0.2.0`.
- `v0.2.1` vẫn là bản phát hành tài liệu đa ngôn ngữ trong lịch sử.
- `v0.1.0` vẫn là bản phát hành lịch sử chỉ gồm các mô-đun chuyên biệt.
- Không cài trực tiếp từ nhánh `main` có thể thay đổi.
- Tham chiếu cài từ xa phải dùng tag phát hành đã duyệt hoặc commit chính xác đã review.
- Danh tính và trạng thái nội dung mô-đun được ghi trong [`modules/catalog.json`](modules/catalog.json).
