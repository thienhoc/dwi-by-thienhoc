# Chọn một mô-đun Dwi

Dwi được thiết kế theo mô-đun. Chỉ cài hành vi nhỏ nhất giải quyết được vấn đề bạn đang quan sát.

| Mô-đun | Chọn khi | File bắt buộc | Hướng dẫn |
| --- | --- | --- | --- |
| `dwi-conduct` | Câu hỏi khó hiểu, nặng suy nghĩ hoặc cần cách sửa sai tử tế | [`SKILL.md`](modules/dwi-conduct/SKILL.md) | [Conduct](docs/vi/modules/conduct.md) |
| `dwi-lean` | Kế hoạch hoặc kiểm thử đang lớn hơn việc thật | [`SKILL.md`](modules/dwi-lean/SKILL.md) | [Lean](docs/vi/modules/lean.md) |
| `dwi-budget` | Cần ranh giới rõ cho thời gian, token hoặc vùng ngữ cảnh | [`SKILL.md`](modules/dwi-budget/SKILL.md) | [Budget](docs/vi/modules/budget.md) |
| `dwi-bridge` | Claude và Codex gốc cần phối hợp với quyền rõ ràng | [`SKILL.md`](modules/dwi-bridge/SKILL.md) | [Bridge](docs/vi/modules/bridge.md) |
| `dwi-arc` | Nhiều ô công việc tách rời cần quy tắc một người ghi | [`SKILL.md`](modules/dwi-arc/SKILL.md) | [Arc](docs/vi/modules/arc.md) |
| `dwi-evidence` | Nhận định cần trạng thái, nguồn gốc và điều chưa biết | [`SKILL.md`](modules/dwi-evidence/SKILL.md) | [Evidence](docs/vi/modules/evidence.md) |
| `dwi-all-in-one` | Nhiều vấn đề lặp lại cùng lúc, cần một mô-đun tổng hợp | [`SKILL.md`](modules/dwi-all-in-one/SKILL.md) | [All-in-One](docs/vi/modules/all-in-one.md) | [All-in-One VI](docs/vi/modules/all-in-one.md) |

## Hợp đồng độc lập

Mỗi mô-đun:

- có một `SKILL.md` tự đủ;
- không cần mô-đun Dwi khác;
- nêu điều sẽ làm và điều không làm;
- không cần phần chạy Dwi riêng, tiến trình nền, gói phụ thuộc, máy chủ kết nối công cụ hoặc website;
- giữ nguyên kiểm soát quyền của lớp công cụ gốc;
- có đường gỡ chính xác.

`dwi-all-in-one` mạnh hơn một mô-đun chuyên biệt, nên chỉ dùng khi nhiều vấn đề đang lặp lại trong cùng một workflow và đã thấy rõ phần cứng cho từng mô-đun riêng lẻ.

`agents/openai.yaml` chỉ bổ sung metadata giao diện tùy chọn cho Codex. Hành vi cốt lõi vẫn nằm trong `SKILL.md`.

## Phạm vi cài

| Lớp công cụ | Trong dự án | Cho người dùng |
| --- | --- | --- |
| Codex | `.agents/skills/<module>/SKILL.md` | `~/.agents/skills/<module>/SKILL.md` |
| Claude Code | `.claude/skills/<module>/SKILL.md` | `~/.claude/skills/<module>/SKILL.md` |

Lần thử đầu nên dùng phạm vi dự án. Xem [hướng dẫn cài và gỡ](docs/vi/installation.md), [bảng thuật ngữ](docs/vi/glossary.md) và [ví dụ nhỏ](docs/vi/examples.md).

## Tham chiếu phiên bản

Nhánh `main` chỉ dùng để xem trước, không phải tham chiếu cài đặt bất biến. Khi kho còn private, hãy cài từ checkout cục bộ đã được phép. Sau khi có bản phát hành đã duyệt, URL cài từ xa phải dùng thẻ phiên bản hoặc mã commit chính xác.

Hiện tại chỉ các module chuyên biệt được gắn vào `v0.1.0`. `dwi-all-in-one` hiện có trong checkout đã duyệt hiện tại và sẽ được ghim trong bản phát hành sau khi có preflight tiếp theo.
