# Dwi • Bridge

**Phối hợp Claude–Codex gốc với quyền hạn rõ ràng.**

[Mở `SKILL.md` để cài](../../../modules/dwi-bridge/SKILL.md) · [English guide](../../modules/bridge.md)

## Chọn Bridge khi

- một lớp công cụ cần góc nhìn độc lập, chỉ đọc từ lớp còn lại;
- Wi giao rõ một bước thực hiện cho công cụ gốc khác;
- cần tách lời khuyên, quyền, tác động và bằng chứng.

## Điều sẽ thay đổi

Bridge tạo gói giao việc tối thiểu, mặc định hỏi chỉ đọc, ngăn hai tác nhân ghi cùng phạm vi, chặn giao việc lồng nhau và yêu cầu kiểm tra độc lập mọi tác động trả về.

## Điều không thay đổi

Bridge không tạo đầu nối, tiến trình chạy nền, nơi giữ thông tin đăng nhập hoặc hệ thống cấp quyền mới. Tin nhắn không phải quyền. Khả năng hoạt động phụ thuộc công cụ gốc đã được cài và cho phép.

## Thử trong mười phút

1. Cài Bridge theo [hướng dẫn xem trước](../installation.md).
2. Bắt đầu bằng một phản biện chỉ đọc, không chứa bí mật.
3. Chỉ gửi thư mục làm việc, câu hỏi có giới hạn, phạm vi và bằng chứng nghiệm thu.
4. Tự kiểm tra các nhận định hữu ích.
5. Chưa thử giao quyền ghi cho đến khi người dùng cho phép rõ.

## Kết quả tốt

Công cụ thứ hai cải thiện quyết định mà không nhận quyền ẩn hoặc tạo tác động không thể kiểm tra.

## An toàn và cách gỡ

Xem [mô hình an toàn](../safety.md). Làm theo [cách gỡ từng file](../installation.md#gỡ-mô-đun) trong đúng phạm vi dự án hoặc người dùng đã cài Bridge, rồi mở phiên mới.
