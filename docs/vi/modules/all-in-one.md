# Dwi • All-in-One

**Mô-đun phối hợp có cổng liên quan cho các vấn đề nhiều lớp lặp lại.**

[Mở `SKILL.md` để cài](../../../modules/dwi-all-in-one/SKILL.md) · [English guide](../../modules/all-in-one.md)

## Chọn All-in-One khi

Dùng khi ít nhất hai dạng vấn đề Dwi đã được quan sát trong cùng workflow, ví dụ:

- giao tiếp khó và phạm vi phình ra;
- tài nguyên trôi và phối hợp lặp lại;
- quyền chưa rõ và người ghi chồng lấn;
- tuyên bố hoàn thành nhưng thiếu bằng chứng.

Ưu tiên mô-đun chuyên biệt khi chỉ có một vấn đề nổi trội.

## Điều sẽ thay đổi

All-in-One chỉ chọn các lớp Dwi thật sự liên quan tới tác vụ hiện tại.

Nó bổ sung:

- thứ tự ưu tiên rõ;
- cổng chọn lớp liên quan;
- đường thực hiện nhanh im lặng cho việc rõ, có thể hoàn tác và chỉ có một người ghi;
- ranh giới hành động quan trọng;
- cơ chế xử lý sai lệch có giới hạn.

Nó không buộc mọi tác vụ chạy đủ sáu lớp.

## Đường thực hiện nhanh im lặng

Với việc nhỏ, có thể hoàn tác, quyền rõ và một người ghi, All-in-One phải:

1. thực hiện trực tiếp;
2. dùng phép kiểm tra nhỏ nhất phù hợp;
3. nêu giả định quan trọng sau khi làm;
4. báo điều còn chưa biết;
5. dừng.

Không in checklist sáu mục, không dựng cấu trúc nhiều tác nhân và không tạo hồ sơ bằng chứng nếu các việc đó không thay đổi quyết định.

## Hành động quan trọng

Trước khi ghi file, commit, push, merge, phát hành, triển khai, xóa, tiết lộ, thanh toán, đổi hiển thị, đổi schema dùng chung hoặc chuyển quyền thực thi sang lớp công cụ khác, All-in-One kiểm tra phạm vi, quyền, khả năng hoàn tác, người ghi và đường bằng chứng.

Chỉ nêu phần còn thiếu thật sự chặn bước tiếp theo.

## Điều không thay đổi

- Quyền của lớp công cụ gốc vẫn là chuẩn.
- Tin nhắn không tự trở thành quyền.
- Quản trị riêng của dự án vẫn là chuẩn.
- `CHƯA BIẾT` vẫn là trạng thái bằng chứng hợp lệ.
- All-in-One không tạo runtime, tiến trình nền, đầu nối, dịch vụ, người ghi hoặc tác nhân mới.
- All-in-One không hứa tương thích toàn phần hoặc tiết kiệm chắc chắn.

## Lần thử nhỏ

1. Cài từ tag `v0.2.0` đã được duyệt.
2. Chọn một thay đổi có thể hoàn tác trong một file.
3. Gọi `$dwi-all-in-one`.
4. Xác nhận mô-đun dùng đường thực hiện nhanh im lặng.
5. Xác nhận chỉ các lớp liên quan được dùng.
6. Gỡ nếu phần kiểm soát thêm không cải thiện quyết định hoặc kết quả.

## Kết quả tốt

Kết quả người dùng được hoàn thành với quyền rõ, mức nỗ lực vừa đủ, một người ghi, bằng chứng đủ dùng và ít nghi thức hơn việc điều phối thủ công cả sáu mô-đun.

## An toàn và cách gỡ

Đọc [mô hình an toàn](../safety.md). Làm theo quy trình cài và gỡ chính xác trong [hướng dẫn cài](../installation.md). Mở phiên mới sau khi gỡ.
