# Dwi • Arc

**Các ô nhiều tác nhân có giới hạn, mỗi phạm vi một người ghi.**

[Mở `SKILL.md` để cài](../../../modules/dwi-arc/SKILL.md) · [English guide](../../modules/arc.md)

## Chọn Arc khi

- phản biện độc lập có thể thay đổi quyết định nghiệm thu;
- có nhiều luồng việc thật sự tách rời;
- cần ngữ cảnh chuyên môn riêng;
- phần tích hợp cần một chủ sở hữu và một cổng kiểm tra.

## Điều sẽ thay đổi

Tác nhân Gốc giữ kết quả người dùng và quyền tích hợp. Mỗi ô công việc nhận phạm vi đọc hoặc ghi có giới hạn. Các tầng W1, W2 và W3 lần lượt dùng cho tạo kết quả, tích hợp và kiểm tra độc lập; tầng không cần sẽ bị bỏ.

## Điều không thay đổi

Arc không biến việc nhỏ thành việc nhiều tác nhân. Mô-đun không cho phép hai người ghi chồng lấn, đội tác nhân suy đoán, giao việc lồng nhau hoặc hồ sơ quy trình chưa có giá trị.

## Thử trong mười phút

1. Cài Arc theo [hướng dẫn xem trước](../installation.md).
2. Chọn việc có hai câu hỏi chỉ đọc, độc lập.
3. Để Gốc giao một câu hỏi có giới hạn cho mỗi ô.
4. Để Gốc tổng hợp và nêu kết quả bị loại hoặc chưa chắc.
5. Chỉ thêm người ghi trong lần thử sau với phạm vi tách rõ.

## Kết quả tốt

Làm song song giảm thời gian quyết định hoặc tăng chất lượng bằng chứng mà không làm quyền sở hữu khó hiểu hơn.

## An toàn và cách gỡ

Xem [mô hình an toàn](../safety.md). Làm theo [cách gỡ từng file](../installation.md#gỡ-mô-đun) trong đúng phạm vi dự án hoặc người dùng đã cài Arc, rồi mở phiên mới.
