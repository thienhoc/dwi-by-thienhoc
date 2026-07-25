# Chọn một mô-đun Dwi

Dwi được thiết kế theo mô-đun. Chỉ cài hành vi nhỏ nhất giải quyết được vấn đề đang quan sát.

| Mô-đun | Chọn khi | File bắt buộc | Hướng dẫn |
| --- | --- | --- | --- |
| `dwi-conduct` | Câu hỏi khó hiểu, nặng suy nghĩ hoặc cần cách sửa sai tử tế | [`SKILL.md`](modules/dwi-conduct/SKILL.md) | [Conduct](docs/vi/modules/conduct.md) |
| `dwi-lean` | Kế hoạch hoặc kiểm thử đang lớn hơn việc thật | [`SKILL.md`](modules/dwi-lean/SKILL.md) | [Lean](docs/vi/modules/lean.md) |
| `dwi-budget` | Cần ranh giới rõ cho thời gian, token hoặc vùng ngữ cảnh | [`SKILL.md`](modules/dwi-budget/SKILL.md) | [Budget](docs/vi/modules/budget.md) |
| `dwi-bridge` | Claude và Codex gốc cần phối hợp với quyền rõ ràng | [`SKILL.md`](modules/dwi-bridge/SKILL.md) | [Bridge](docs/vi/modules/bridge.md) |
| `dwi-arc` | Nhiều ô công việc tách rời cần quy tắc một người ghi | [`SKILL.md`](modules/dwi-arc/SKILL.md) | [Arc](docs/vi/modules/arc.md) |
| `dwi-evidence` | Nhận định cần trạng thái, nguồn gốc và điều chưa biết | [`SKILL.md`](modules/dwi-evidence/SKILL.md) | [Evidence](docs/vi/modules/evidence.md) |
| `dwi-all-in-one` | Nhiều vấn đề lặp lại cùng lúc | [`SKILL.md`](modules/dwi-all-in-one/SKILL.md) | [All-in-One](docs/vi/modules/all-in-one.md) |

## Hợp đồng độc lập

Mỗi mô-đun chuyên biệt:

- có một `SKILL.md` tự đủ;
- không cần mô-đun Dwi khác;
- nêu điều sẽ làm và điều không làm;
- không cần phần chạy Dwi riêng, tiến trình nền, gói phụ thuộc, máy chủ kết nối công cụ hoặc website;
- giữ nguyên kiểm soát quyền của lớp công cụ gốc;
- có đường gỡ chính xác.

`dwi-all-in-one` là mô-đun phối hợp tùy chọn. Chỉ dùng khi nhiều vấn đề lặp lại cùng lúc trong cùng workflow. Nó không tạo một lớp quyền mới và không được buộc mọi tác vụ chạy đủ sáu lớp.

`agents/openai.yaml` chỉ bổ sung metadata giao diện tùy chọn cho Codex. Hành vi cốt lõi vẫn nằm trong `SKILL.md`.

## Phạm vi cài

| Lớp công cụ | Trong dự án | Cho người dùng |
| --- | --- | --- |
| Codex | `.agents/skills/<module>/SKILL.md` | `~/.agents/skills/<module>/SKILL.md` |
| Claude Code | `.claude/skills/<module>/SKILL.md` | `~/.claude/skills/<module>/SKILL.md` |

Lần thử đầu nên dùng phạm vi dự án. Xem [hướng dẫn cài và gỡ](docs/vi/installation.md), [bảng thuật ngữ](docs/vi/glossary.md) và [ví dụ nhỏ](docs/vi/examples.md).

## Tham chiếu phiên bản

- `v0.2.0` là bản phát hành đã duyệt gần nhất và gồm sáu mô-đun chuyên biệt cùng mô-đun phối hợp tùy chọn All-in-One.
- Mỗi mô-đun đã phát hành có nguồn từ xa theo tag phiên bản; không cài từ `main` có thể thay đổi.
- `v0.1.0` vẫn là bản phát hành lịch sử chỉ gồm các mô-đun chuyên biệt.
- Không cài trực tiếp từ nhánh `main` có thể thay đổi.
- Tham chiếu cài từ xa phải dùng tag đã duyệt hoặc commit chính xác đã review.
- Danh tính và trạng thái phát hành của mô-đun được ghi trong [`modules/catalog.json`](modules/catalog.json).
