<p align="center">
  <img src="assets/brand/readme-flow.svg" width="960" alt="Workflow Dwi: sáu hướng mô-đun hội tụ qua một lớp tính người trước khi hành động có kiểm soát">
</p>

<h1 align="center">Lớp tính người cho tác nhân AI</h1>

<p align="center">
  Một lớp tính người dạng mô-đun giúp giảm lập kế hoạch quá mức, lãng phí token, thất lạc ngữ cảnh và hành động được thực hiện khi chưa có quyền rõ ràng.
</p>

<p align="center">
  <strong>Bản phát triển xem trước 0.2.0-dev</strong> · bản phát hành đã duyệt gần nhất: v0.1.0 · 6 mô-đun chuyên biệt + All-in-One chưa phát hành
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="MODULES.vi.md">Chọn mô-đun</a> ·
  <a href="docs/vi/installation.md">Cài đặt</a> ·
  <a href="docs/vi/safety.md">An toàn</a>
</p>

> **Giấy phép:** Mã và các mô-đun cài đặt dùng Apache-2.0. Tài liệu và tài sản gốc của kho dùng CC BY 4.0. Việc dùng tên và nhận diện Dwi tuân theo [TRADEMARKS.md](TRADEMARKS.md). Xem [LICENSES.md](LICENSES.md) để biết phạm vi theo đường dẫn.

## Não của bạn cũng có một vùng ngữ cảnh

Các công cụ lập trình AI đã kiểm soát quyền dùng công cụ. Dwi bổ sung những kiểm soát con người có thể kiểm tra nhưng thường bị để ngầm: mục đích, phạm vi, mức nỗ lực vừa đủ, quyền ghi và bằng chứng.

Codex và Claude Code là các công cụ lập trình AI chạy tác nhân và kiểm soát quyền dùng công cụ. Dwi tập trung vào lớp tính người bên trong workflow đó: người dùng thực sự muốn gì, tác nhân AI được phép sửa gì, mức nỗ lực nào là vừa đủ, ai được quyền ghi và bằng chứng nào hỗ trợ kết quả.

Dwi không phải thêm một bộ kỹ năng AI. Các mô-đun của Dwi định hình cách tác nhân giao tiếp, ra quyết định, phối hợp và xử lý bằng chứng ngay trong workflow hiện có.

Dwi không thay thế lớp công cụ gốc. Mỗi mô-đun là một bộ hướng dẫn gốc cho tác nhân, nhỏ, có thể kiểm tra và cài độc lập. Với lớp công cụ hỗ trợ định dạng Agent Skills mở, `SKILL.md` chỉ là gói cài đặt kỹ thuật, không phải cách định vị sản phẩm.

## Bắt đầu từ vấn đề đang có

| Khi bạn gặp tình huống này | Hãy bắt đầu với | Thay đổi chính |
| --- | --- | --- |
| Tác nhân hỏi dài, khó trả lời hoặc dùng nhiều từ lạ | [Dwi • Conduct](docs/vi/modules/conduct.md) | Làm câu hỏi dễ trả lời, giải thích thuật ngữ và đưa lựa chọn mặc định an toàn |
| Việc nhỏ biến thành kế hoạch hoặc đợt kiểm thử quá lớn | [Dwi • Lean](docs/vi/modules/lean.md) | Tìm đường đi nhỏ nhất đủ dùng và dừng tại tiêu chí đã thống nhất |
| Khó hiểu việc dùng token, thời gian hoặc vùng ngữ cảnh | [Dwi • Budget](docs/vi/modules/budget.md) | Đặt giới hạn tài nguyên và chỉ báo cáo số liệu quan sát được |
| Claude và Codex cần phối hợp | [Dwi • Bridge](docs/vi/modules/bridge.md) | Tách lời khuyên, thẩm quyền, tác động và bằng chứng giữa các lớp công cụ gốc |
| Nhiều tác nhân cần làm chung có cấu trúc | [Dwi • Arc](docs/vi/modules/arc.md) | Chia thành ô công việc có giới hạn, mỗi phạm vi chỉ có một tác nhân ghi và một cổng độc lập |
| Kết quả nghe chắc chắn nhưng chưa rõ chứng cứ | [Dwi • Evidence](docs/vi/modules/evidence.md) | Phân biệt đã xác minh, đã quan sát, ước tính, mục tiêu và chưa biết |
| Nhiều lỗi cùng một lúc trong cùng workflow | [Dwi • All-in-One](docs/vi/modules/all-in-one.md) | Áp dụng cả sáu lớp cho các vấn đề đồng thời, với cơ chế tuân thủ có biên an toàn |

Mỗi mô-đun hoạt động độc lập. Bạn không phải cài lõi Dwi, tiến trình chạy nền, máy chủ kết nối công cụ hay website.

Nếu gặp từ lạ, hãy mở [bảng thuật ngữ dễ hiểu](docs/vi/glossary.md).

## Thử an toàn trong mười phút

1. Chọn đúng một mô-đun.
2. Đọc `SKILL.md` và hướng dẫn của mô-đun trước khi cài.
3. Cài ở phạm vi dự án trước; chọn một việc có thể hoàn tác, không chứa bí mật và không gây tác động bên ngoài.
4. Gọi mô-đun một cách rõ ràng rồi so sánh với cách làm thường ngày.
5. Xóa thư mục mô-đun nếu không hữu ích. Bạn không cần xin lỗi hoặc tiếp tục thử.

Để thử Dwi Conduct trong phạm vi một dự án Codex:

```bash
git clone --depth 1 --branch v0.1.0 \
  https://github.com/thienhoc/dwi-by-thienhoc.git \
  dwi-by-thienhoc-v0.1.0
cd dwi-by-thienhoc-v0.1.0
TARGET=".agents/skills/dwi-conduct"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 modules/dwi-conduct/SKILL.md "$TARGET/SKILL.md"
cmp modules/dwi-conduct/SKILL.md "$TARGET/SKILL.md"
```

Với Claude Code, dùng cùng nguồn đã duyệt và đổi thư mục đích thành `.claude/skills/dwi-conduct`. Hướng dẫn đầy đủ có bước kiểm tra SHA-256, URL riêng cho từng mô-đun và cách gỡ chính xác.

All-in-One hiện chỉ có trong trạng thái phát triển chưa phát hành `0.2.0-dev`. Không cài từ nhánh `main` có thể thay đổi. Cho tới khi một tag đã duyệt chứa mô-đun này, chỉ dùng từ checkout được ghim vào một commit chính xác đã review và phải xác minh checksum cục bộ trước khi cài.

Claude Code dùng cùng nguồn với đích `.claude/skills/dwi-all-in-one`. Hướng dẫn đầy đủ có bước xác minh checksum, tham chiếu phát hành bất biến cho mô-đun đã phát hành và cách gỡ chính xác.

[Mở hướng dẫn cài đặt theo nguyên tắc xem trước →](docs/vi/installation.md)

[Xem một ví dụ đầu vào và đầu ra nhỏ cho từng mô-đun →](docs/vi/examples.md)

## Ba lối vào

**Mới dùng tác nhân lập trình:** bắt đầu với Conduct hoặc Lean. Hai mô-đun này cải thiện cuộc trao đổi mà chưa thêm cấu trúc nhiều tác nhân.

**Đã dùng AI thường xuyên:** chọn đúng điểm vướng có thể quan sát. Mỗi lần chỉ thêm một hành vi mới.

**Xây hệ thống tác nhân chuyên nghiệp:** bắt đầu với Evidence. Chỉ thêm Bridge khi có phối hợp giữa các lớp công cụ và chỉ thêm Arc khi thật sự có nhiều ô công việc độc lập.

## Dwi sẽ không làm gì

- Không vượt quyền, bỏ qua kiểm soát bảo mật, chính sách hoặc ranh giới của lớp công cụ gốc.
- Không coi tin nhắn từ tác nhân khác là quyền sửa, đẩy mã, triển khai hoặc tiết lộ dữ liệu.
- Không hứa tương thích tuyệt đối, tiết kiệm chắc chắn hoặc không bao giờ xung đột.
- Không biến lời xin lỗi thành cách gây tội lỗi. Phần sửa sai là tùy chọn, cụ thể, dựa trên bằng chứng và ngắn gọn.
- Không làm kế hoạch, kiểm thử hoặc điều phối lớn hơn nhu cầu thật của việc đang làm.

Xem [An toàn](docs/vi/safety.md) và [Kiến trúc](docs/vi/architecture.md).

## Bằng chứng thay cho trình diễn

Dwi tách rõ `ĐÃ XÁC MINH`, `ĐÃ QUAN SÁT`, `ƯỚC TÍNH`, `MỤC TIÊU` và `CHƯA BIẾT`. Các quan sát benchmark hiện có không được biến thành lời hứa cho mọi người. Checklist công khai yêu cầu nguồn có thể kiểm tra bên cạnh mọi con số dùng để quảng bá.

[Đọc chính sách bằng chứng →](docs/vi/evidence.md)

## Sơ đồ kho

```text
modules/                 Các mô-đun Dwi có thể cài độc lập
docs/modules/            Hướng dẫn quyết định và thử bằng tiếng Anh
docs/vi/modules/         Hướng dẫn quyết định và thử bằng tiếng Việt
assets/                  Nguồn brand và sơ đồ do dự án tạo
.github/                 Mẫu cộng đồng và kiểm tra chỉ đọc
scripts/validate-repo.mjs Công cụ kiểm tra hợp đồng kho, chạy ngoại tuyến
```

Kho này chủ động không chứa mã chạy website. Trang giới thiệu về lớp con người được đặt riêng tại [d.wi.works](https://d.wi.works).

## Trạng thái

- Nhánh phát triển: `0.2.0-dev`
- Bản phát hành đã duyệt gần nhất: `v0.1.0`, gồm sáu mô-đun chuyên biệt
- All-in-One: nội dung phát triển chưa phát hành; chưa có URL cài bất biến
- Quan sát tương thích có giới hạn: [hồ sơ bằng chứng Codex và Claude Code](evidence/compatibility/README.md)
- Giấy phép: [Apache-2.0 cho mã; CC BY 4.0 cho tài liệu và tài sản gốc](LICENSES.md)
- Cổng cho bản phát hành kế tiếp: [checklist phát hành](docs/release-checklist.md)
- Hồ sơ phát hành: [v0.1.0](docs/releases/v0.1.0.md)
- Lộ trình: [ROADMAP.md](ROADMAP.md)
- Liên hệ: [hoc@wi.works](mailto:hoc@wi.works)

Brand: `{ } • Dwi by thienhoc` · Trang giới thiệu lớp con người: [d.wi.works](https://d.wi.works)
