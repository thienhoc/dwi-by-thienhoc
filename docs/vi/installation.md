# Cài một mô-đun, xem trước khi dùng

Dwi là một lớp tính người dạng mô-đun. Mỗi mô-đun được phân phối dưới dạng hướng dẫn gốc cho tác nhân. Không có tiến trình Dwi chạy nền, dịch vụ cài đặt riêng, máy chủ MCP hoặc phụ thuộc website. Vẫn cần một lớp công cụ lập trình AI được hỗ trợ như Codex hoặc Claude Code.

## Đính chính quan trọng về chính sách kích hoạt

Các ví dụ cài đặt đã phát hành từ `v0.1.0` đến `v0.2.1` chỉ sao chép `SKILL.md`. Cách đó đủ để lớp công cụ nhận ra mô-đun, nhưng không giữ được hợp đồng chỉ kích hoạt khi người dùng gọi rõ:

- Codex còn cần `agents/openai.yaml` với `allow_implicit_invocation: false`.
- Claude Code cần `disable-model-invocation: true` trong YAML frontmatter của `SKILL.md` đã cài.

Nếu thiếu các điều khiển riêng theo từng lớp công cụ này, model có thể tự chọn mô-đun Dwi dựa trên phần mô tả dù người dùng chưa gọi rõ. Đây là lỗi đóng gói và tài liệu. Lỗi này không tự cấp thêm quyền dùng công cụ, không vượt sandbox và không bỏ qua cơ chế phê duyệt gốc.

Các ví dụ cũ còn `cd` vào checkout Dwi rồi dùng target tương đối như `.agents/skills/...`. Trừ khi checkout Dwi chính là dự án chủ ý dùng để thử, cách đó cài mô-đun vào repo nguồn Dwi thay vì dự án thật của người dùng. Ví dụ đã sửa tách riêng `DWI_ROOT` và `PROJECT_ROOT`, chuẩn hóa đường dẫn vật lý trước khi so sánh và từ chối target nằm trong checkout source Dwi.

Các tag đã phát hành phải được giữ bất biến, không sửa ngược lịch sử. Cho đến khi có tag vá lỗi đã được duyệt, hãy dùng đúng commit đã được kiểm tra có chứa `scripts/install-module.mjs`. Một commit phát triển chính xác chỉ định source đang được kiểm tra, không tự biến nó thành bản phát hành.

## Trước khi cài

1. Chọn một mô-đun trong [MODULES.vi.md](../../MODULES.vi.md).
2. Đọc `SKILL.md` chuẩn ngay trong kho.
3. Kiểm tra tác dụng, điều mô-đun không làm, ranh giới quyền hạn, chính sách kích hoạt và cách gỡ.
4. Lần thử đầu nên cài trong phạm vi dự án.
5. Chọn một việc có thể hoàn tác, không chứa bí mật và không tạo tác động bên ngoài.

Không chuyển thẳng một tập lệnh từ xa chưa được xem xét vào shell.

## Cài từ checkout đã ghim

Giữ checkout source Dwi đã kiểm tra tách biệt với dự án nhận mô-đun. Thay hai đường dẫn mẫu dưới đây bằng các thư mục đã tồn tại. `pwd -P` giải quyết cách viết đường dẫn khác nhau và bí danh symlink trước khi kiểm tra quan hệ chứa:

```bash
DWI_ROOT="$(cd "/duong-dan-tuyet-doi/toi/dwi-by-thienhoc" && pwd -P)" || exit 1
PROJECT_ROOT="$(cd "/duong-dan-tuyet-doi/toi/du-an-cua-ban" && pwd -P)" || exit 1
test -f "$DWI_ROOT/scripts/install-module.mjs"
case "$PROJECT_ROOT/" in
  "$DWI_ROOT/"*)
    printf '%s\n' "PROJECT_ROOT phải nằm ngoài DWI_ROOT sau khi chuẩn hóa đường dẫn" >&2
    exit 1
    ;;
esac
node --version
```

Trình cài cục bộ cần Node.js 20 trở lên, từ chối ghi đè thư mục mô-đun đang có, dựng đủ artifact trước khi chuyển vào vị trí đích, chuẩn hóa target dự kiến và từ chối target trỏ tới checkout source Dwi hoặc bất kỳ thư mục con nào của nó. Kiểm tra này cũng bao phủ bí danh symlink.

## Codex

Codex nhận kỹ năng của dự án tại `.agents/skills/` và kỹ năng của người dùng tại `~/.agents/skills/`.

Ví dụ cài Conduct trong phạm vi dự án:

```bash
MODULE="dwi-conduct"
TARGET="${PROJECT_ROOT}/.agents/skills/${MODULE}"
node "$DWI_ROOT/scripts/install-module.mjs" codex "$MODULE" "$TARGET"
test -f "$TARGET/SKILL.md"
test -f "$TARGET/agents/openai.yaml"
grep -Eq '^  allow_implicit_invocation: false$' "$TARGET/agents/openai.yaml"
```

Cấu trúc sau khi cài là:

```text
<du-an-cua-ban>/.agents/skills/dwi-conduct/
├── SKILL.md
└── agents/
    └── openai.yaml
```

Sau đó mở một phiên Codex mới từ `PROJECT_ROOT` và gọi rõ `$dwi-conduct`. Một yêu cầu có nội dung phù hợp nhưng không nhắc `$dwi-conduct` không nên tự kích hoạt mô-đun.

### Nhận diện mẫu cài một file bị ảnh hưởng

Không chạy mẫu dưới đây. Nội dung được giữ nguyên chỉ để người dùng nhận ra một bản cài từ `v0.1.0` đến `v0.2.1`:

```text
SOURCE="modules/dwi-conduct/SKILL.md"
TARGET=".agents/skills/dwi-conduct"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

Nếu đây là toàn bộ các bước đã dùng, hãy kiểm tra mô-đun nằm trong checkout Dwi hay trong dự án chủ ý cài, rồi thêm metadata Codex còn thiếu theo phần sửa bản cài bên dưới.

### Cách cài Codex thủ công tương đương

```bash
MODULE="dwi-conduct"
SOURCE="${DWI_ROOT}/modules/${MODULE}"
TARGET="${PROJECT_ROOT}/.agents/skills/${MODULE}"
test -f "$SOURCE/SKILL.md"
test -f "$SOURCE/agents/openai.yaml"
test ! -e "$TARGET"
install -d "$TARGET/agents"
install -m 0644 "$SOURCE/SKILL.md" "$TARGET/SKILL.md"
install -m 0644 "$SOURCE/agents/openai.yaml" "$TARGET/agents/openai.yaml"
cmp "$SOURCE/SKILL.md" "$TARGET/SKILL.md"
cmp "$SOURCE/agents/openai.yaml" "$TARGET/agents/openai.yaml"
```

## Claude Code

Claude Code nhận kỹ năng của dự án tại `.claude/skills/` và kỹ năng của người dùng tại `~/.claude/skills/`.

Ví dụ cài Conduct trong phạm vi dự án:

```bash
MODULE="dwi-conduct"
TARGET="${PROJECT_ROOT}/.claude/skills/${MODULE}"
node "$DWI_ROOT/scripts/install-module.mjs" claude "$MODULE" "$TARGET"
test -f "$TARGET/SKILL.md"
grep -Eq '^disable-model-invocation: true$' "$TARGET/SKILL.md"
```

Trình cài tạo artifact Claude từ `SKILL.md` chuẩn, trung lập với nhà cung cấp, rồi thêm đúng một trường frontmatter riêng cho Claude Code:

```yaml
disable-model-invocation: true
```

Sau đó mở một phiên Claude Code mới từ `PROJECT_ROOT` và gọi rõ `/dwi-conduct`. Một yêu cầu có nội dung phù hợp nhưng không gọi `/dwi-conduct` không nên khiến Claude tự nạp mô-đun.

### Nhận diện mẫu cài một file bị ảnh hưởng

Không chạy mẫu dưới đây. Nội dung được giữ nguyên chỉ để người dùng nhận ra một bản cài từ `v0.1.0` đến `v0.2.1`:

```text
SOURCE="modules/dwi-conduct/SKILL.md"
TARGET=".claude/skills/dwi-conduct"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

Nếu không có Node.js, hãy sao chép `SKILL.md` chuẩn từ `DWI_ROOT`, thêm `disable-model-invocation: true` vào YAML frontmatter mở đầu, rồi xác nhận phần còn lại của file không thay đổi trước khi mở phiên mới từ `PROJECT_ROOT`.

## Cài một mô-đun khác

Thay `dwi-conduct` bằng một trong các tên sau:

```text
dwi-lean
dwi-budget
dwi-bridge
dwi-arc
dwi-evidence
dwi-all-in-one
```

`dwi-all-in-one` là mô-đun phối hợp tùy chọn. Chỉ cài khi nhiều vấn đề đã quan sát lặp lại trong cùng workflow.

## URL cài đặt đã ghim cho bản phát hành

Các URL source thô bất biến dưới đây vẫn hữu ích để kiểm tra, nhưng đường cài một file của `v0.2.0` không phải gói explicit-only hoàn chỉnh. Không chỉ sao chép `SKILL.md` nếu thời điểm kích hoạt là một yêu cầu quan trọng.

| Mô-đun | Source chuẩn bất biến |
| --- | --- |
| Conduct | [dwi-conduct/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-conduct/SKILL.md) |
| Lean | [dwi-lean/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-lean/SKILL.md) |
| Budget | [dwi-budget/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-budget/SKILL.md) |
| Bridge | [dwi-bridge/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-bridge/SKILL.md) |
| Arc | [dwi-arc/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-arc/SKILL.md) |
| Evidence | [dwi-evidence/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-evidence/SKILL.md) |
| All-in-One | [dwi-all-in-one/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-all-in-one/SKILL.md) |

Bản phát hành sửa lỗi tiếp theo phải ghim đầy đủ đường cài theo từng lớp công cụ và PASS `scripts/validate-install-contract.mjs` trước khi công bố.

## Sửa một bản cài cũ chỉ có một file

Trước hết, xác định dự án thực sự đang chứa `SKILL.md` đã cài. Dùng thư mục đó làm `PROJECT_ROOT`; không mặc định checkout Dwi là nơi nhận mô-đun. Chuẩn hóa cả hai root bằng khối lệnh đường dẫn vật lý ở trên trước khi sửa bất kỳ file nào.

### Sửa bản cài Codex

Nếu thư mục đã cài hiện chỉ có `SKILL.md`, thêm metadata còn thiếu mà không thay thế skill:

```bash
MODULE="dwi-conduct"
SOURCE="${DWI_ROOT}/modules/${MODULE}/agents/openai.yaml"
TARGET="${PROJECT_ROOT}/.agents/skills/${MODULE}/agents/openai.yaml"
test -f "${PROJECT_ROOT}/.agents/skills/${MODULE}/SKILL.md"
test -f "$SOURCE"
test ! -e "$TARGET"
install -d "$(dirname "$TARGET")"
install -m 0644 "$SOURCE" "$TARGET"
cmp "$SOURCE" "$TARGET"
```

Sau đó mở một phiên Codex mới từ `PROJECT_ROOT`.

### Sửa bản cài Claude Code

Cách kiểm soát nhanh và có thể hoàn tác là mở `/skills` từ dự án bị ảnh hưởng, chọn mô-đun Dwi, chuyển trạng thái sang `user-invocable-only` rồi lưu. Claude Code ghi override cục bộ đó vào `.claude/settings.local.json`.

Để sửa trực tiếp bằng artifact mới, chuyển thư mục cũ ra ngoài `.claude/skills/` trước khi kiểm thử. Việc này ngăn Claude Code phát hiện bản sao lưu vẫn còn khả năng được model tự gọi bên cạnh artifact đã sửa:

```bash
MODULE="dwi-conduct"
OLD="${PROJECT_ROOT}/.claude/skills/${MODULE}"
BACKUP_ROOT="${PROJECT_ROOT}/.claude/dwi-skill-backups"
BACKUP="${BACKUP_ROOT}/${MODULE}.before-explicit-only"
test -d "$OLD"
test ! -e "$BACKUP"
install -d "$BACKUP_ROOT"
mv "$OLD" "$BACKUP"
node "$DWI_ROOT/scripts/install-module.mjs" claude "$MODULE" "$OLD"
grep -Eq '^disable-model-invocation: true$' "$OLD/SKILL.md"
```

`BACKUP_ROOT` nằm ngoài `.claude/skills/`, nên mô-đun cũ không thuộc thư mục discovery của project skill trong lúc kiểm thử phiên mới. Giữ bản sao lưu cho đến khi cả negative test và kiểm tra gọi rõ đều PASS. Sau đó kiểm tra rồi xóa đúng bản sao lưu, hoặc chỉ chuyển nó trở lại khi chủ ý rollback.

## Gỡ mô-đun

Với Codex, chỉ xóa hai file do hướng dẫn này cài, rồi chỉ xóa thư mục khi rỗng:

```bash
TARGET="${PROJECT_ROOT}/.agents/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
test -f "$TARGET/agents/openai.yaml"
rm "$TARGET/agents/openai.yaml"
rmdir "$TARGET/agents"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

Với Claude Code:

```bash
TARGET="${PROJECT_ROOT}/.claude/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

`rmdir` sẽ dừng an toàn nếu còn file khác. Hãy xem nội dung đó thay vì xóa đệ quy. Nếu đã cài cho người dùng, dùng đúng thư mục tương ứng dưới `~/.agents/skills/` hoặc `~/.claude/skills/`. Mở phiên mới sau khi gỡ.

## Khi nào nên dừng

Dừng thử nếu mô-đun đòi quyền lớn hơn nhu cầu thật, che giấu tác động bên ngoài, xung đột với kiểm soát của lớp công cụ gốc, tự kích hoạt khi chưa được gọi rõ, bị cài vào nhầm dự án hoặc làm quy trình khó hiểu hơn. Gỡ bỏ là một kết quả hợp lệ; bạn không phải xin lỗi hoặc tiếp tục.
