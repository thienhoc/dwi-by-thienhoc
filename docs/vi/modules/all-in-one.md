# Dwi • All-in-One

**Một mô-đun tùy chọn cho các vấn đề đan chéo lặp lại nhiều chiều.**

[Mở `SKILL.md` để cài](../../../modules/dwi-all-in-one/SKILL.md) · [English guide](../../modules/all-in-one.md)

## Chọn All-in-One khi

- cùng workflow lặp đi lặp lại các biểu hiện của nhiều mô-đun;
- phạm vi, chi phí và trách nhiệm kéo trôi cùng lúc;
- các mô-đun riêng lẻ có ích nhưng điều phối thủ công quá phức tạp;
- bạn muốn khởi động nhanh một cách có ranh giới cho công việc lặp lại nhiều ma sát.

## Điều sẽ thay đổi

All-in-One gom 6 lớp của Dwi trong một mô-đun riêng: truyền thông, kích thước kế hoạch, kiểm soát nguồn lực, phối hợp, một người viết cho từng ô công việc, và nhãn bằng chứng.

Nó giữ cùng ranh giới rõ ràng và thêm cơ chế tuân thủ có biên để kiểm soát sai sót lặp lại trước khi leo thang.

## Điều không thay đổi

- Không thay thế ranh giới quyền của lớp công cụ gốc.
- Không tuyên bố tương thích toàn phần hay tiết kiệm chắc chắn.
- Không bỏ xác nhận người dùng khi hành động có ảnh hưởng lớn.
- Không lấn quyền so với quản trị dự án.

## Khi nên chọn mô-đun chuyên biệt

Dùng mô-đun riêng trước khi chọn All-in-One khi vấn đề nổi trội chỉ ở một điểm:

- chỉ khó giao tiếp: `dwi-conduct`
- chỉ lan man kế hoạch/kiểm thử: `dwi-lean`
- chỉ thiếu ranh giới nguồn lực: `dwi-budget`
- chỉ phối hợp lộn xộn: `dwi-bridge`
- chỉ ranh giới người ghi/phiên làm việc: `dwi-arc`
- chỉ tình trạng bằng chứng/mức tin cậy: `dwi-evidence`

## Cài đặt và thử

1. Cài từ checkout đã duyệt (hoặc URL ghim cho các mô-đun chuyên biệt).
2. Chạy một tác vụ có thể hoàn tác.
3. So sánh kết quả theo độ rõ mục tiêu, ranh giới và hành vi token/ngữ cảnh.
4. Giữ hoặc gỡ sau một lần thử rõ ràng.

Xem hướng dẫn cài đặt trong [docs/vi/installation.md](../installation.md).

## Kiểm tra phù hợp nhanh

Yêu cầu tác vụ chỉ ra:

1. mục tiêu rõ;
2. phạm vi ranh giới;
3. điểm kết thúc;
4. bằng chứng cần có;
5. người chốt quyết định.

Nếu thiếu các mục này, dừng trước khi thao tác tiếp.

## Cơ chế tuân thủ có biên trong thực tế

- lần trượt đầu: dừng đúng bước đang ảnh hưởng, nêu rõ lỗi kiểm tra, sửa ở mức nhỏ nhất, kiểm tra lại đúng một lần;
- lần trượt hai: dừng hành động đó, đặt một câu hỏi xác nhận trực tiếp, và đưa tùy chọn mặc định an toàn.

Nếu người dùng yêu cầu dừng, gỡ mô-đun ngay.

## An toàn và cách gỡ

Đọc mô hình an toàn trước. Làm theo cách cài/gỡ chính xác trong [hướng dẫn cài](../installation.md), gồm xác minh checksum và xóa đúng file đã cài.
