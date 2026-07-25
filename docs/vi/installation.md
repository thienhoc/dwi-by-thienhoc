# Cài một mô-đun, xem trước khi dùng

Dwi là một lớp tính người dạng mô-đun. Mỗi mô-đun được phân phối dưới dạng hướng dẫn gốc cho tác nhân; lớp công cụ hỗ trợ định dạng Agent Skills sẽ nạp hành vi bắt buộc từ `SKILL.md`. Không có dịch vụ cài đặt, tiến trình chạy nền, gói chạy Dwi riêng, máy chủ kết nối công cụ hoặc phụ thuộc website. Vẫn cần một lớp công cụ tác nhân lập trình được hỗ trợ.

## Trước khi cài

1. Chọn một mô-đun trong [MODULES.vi.md](../../MODULES.vi.md).
2. Đọc `SKILL.md` ngay trong kho.
3. Kiểm tra tác dụng, điều mô-đun không làm, ranh giới quyền hạn và cách gỡ.
4. Lần thử đầu nên cài trong phạm vi dự án.
5. Chọn một việc có thể hoàn tác, không chứa bí mật và không tạo tác động bên ngoài.

Không chuyển thẳng một tập lệnh từ xa chưa được xem xét vào shell.

## Cài từ một checkout đã duyệt

Chạy các lệnh sau từ checkout đã duyệt sau khi xác nhận `pwd -P` đúng thư mục.

Nếu cần cài một mô-đun chưa có trong `v0.1.0`, chỉ cài từ checkout đã duyệt.

## Codex

Codex nhận kỹ năng của dự án tại `.agents/skills/` và kỹ năng của người dùng tại `~/.agents/skills/`.

Ví dụ cài Conduct trong dự án:

```bash
pwd -P
SOURCE="modules/dwi-conduct/SKILL.md"
TARGET=".agents/skills/dwi-conduct"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

Sau đó mở phiên Codex mới và gọi rõ `$dwi-conduct`.

## Claude Code

Claude Code nhận kỹ năng của dự án tại `.claude/skills/` và kỹ năng của người dùng tại `~/.claude/skills/`.

Ví dụ cài Conduct trong dự án:

```bash
pwd -P
SOURCE="modules/dwi-conduct/SKILL.md"
TARGET=".claude/skills/dwi-conduct"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

Sau đó mở phiên Claude Code mới và gọi `/dwi-conduct` hoặc yêu cầu lớp công cụ dùng kỹ năng vừa cài.

## Các tên mô-đun khác

Thay `dwi-conduct` trong đường dẫn và thư mục đích bằng:

```text
dwi-lean
dwi-budget
dwi-bridge
dwi-arc
dwi-evidence
dwi-all-in-one
```

## All-in-One từ checkout đã duyệt (hiện tại chưa có trong v0.1.0)

`dwi-all-in-one` là mô-đun tổng hợp tùy chọn và chưa có trong `v0.1.0`.

Chỉ dùng khi đang làm việc trên checkout đã duyệt và module đã có trong đó:

```bash
pwd -P
SOURCE="modules/dwi-all-in-one/SKILL.md"
TARGET=".agents/skills/dwi-all-in-one"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

Với Claude Code, dùng cùng nguồn nhưng đích là `.claude/skills/dwi-all-in-one`.

## URL cài đặt đã ghim cho bản phát hành

Mỗi mô-đun chuyên biệt có URL nguồn cố định tại `v0.1.0`:

| Mô-đun | Nguồn đã duyệt |
| --- | --- |
| Conduct | [dwi-conduct/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-conduct/SKILL.md) |
| Lean | [dwi-lean/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-lean/SKILL.md) |
| Budget | [dwi-budget/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-budget/SKILL.md) |
| Bridge | [dwi-bridge/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-bridge/SKILL.md) |
| Arc | [dwi-arc/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-arc/SKILL.md) |
| Evidence | [dwi-evidence/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-evidence/SKILL.md) |

`dwi-all-in-one` chưa có URL cài ghim.

Tải file đã chọn cùng manifest (danh sách mã kiểm tra), xác minh SHA-256, đọc nội dung rồi mới cài:

```bash
RELEASE_REF="v0.1.0"
MODULE="dwi-conduct"
TMP_SKILL="/tmp/${MODULE}.SKILL.md"
TMP_SUMS="/tmp/dwi-${RELEASE_REF}-SHA256SUMS"
curl -fsSL \
  "https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/${RELEASE_REF}/modules/${MODULE}/SKILL.md" \
  -o "$TMP_SKILL"
curl -fsSL \
  "https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/${RELEASE_REF}/checksums/SHA256SUMS" \
  -o "$TMP_SUMS"
EXPECTED="$(awk -v file="modules/${MODULE}/SKILL.md" '$2 == file {print $1}' "$TMP_SUMS")"
ACTUAL="$(shasum -a 256 "$TMP_SKILL" | awk '{print $1}')"
test -n "$EXPECTED"
test "$ACTUAL" = "$EXPECTED"
less "$TMP_SKILL"
```

Sau khi đọc, cài mà không ghi đè kỹ năng đang có:

```bash
TARGET=".agents/skills/${MODULE}"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$TMP_SKILL" "$TARGET/SKILL.md"
cmp "$TMP_SKILL" "$TARGET/SKILL.md"
```

Với Claude Code, chỉ đổi gốc thư mục đích thành `.claude/skills/`.

## Gỡ mô-đun

Chỉ xóa file do hướng dẫn này đã cài, rồi xóa thư mục nếu thư mục thật sự rỗng:

```bash
TARGET=".agents/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

hoặc:

```bash
TARGET=".claude/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

`rmdir` sẽ dừng an toàn nếu còn file khác. Hãy xem nội dung đó thay vì xóa đệ quy. Nếu đã cài cho người dùng, dùng đúng thư mục tương ứng dưới `~/.agents/skills/` hoặc `~/.claude/skills/`. Mở phiên mới sau khi gỡ.

## Khi nào nên dừng

Dừng thử nếu mô-đun đòi quyền lớn hơn nhu cầu thật, che giấu tác động bên ngoài, xung đột với kiểm soát của lớp công cụ gốc hoặc làm quy trình khó hiểu hơn. Gỡ bỏ là một kết quả hợp lệ; bạn không phải xin lỗi hoặc tiếp tục.
