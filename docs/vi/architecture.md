# Kiến trúc: lớp công cụ gốc, lớp Dwi và ý định con người

![Kiến trúc Dwi](../../assets/architecture.svg)

Dwi nằm giữa ý định của con người và lớp công cụ tác nhân lập trình dưới dạng hướng dẫn có thể đọc. Dwi không chuyển tiếp lưu lượng mô hình, không thay hệ thống quyền hạn và không cần dịch vụ điều phối.

## Bốn lớp cần tách

| Lớp | Câu hỏi |
| --- | --- |
| Ý định | Người dùng muốn kết quả gì và quyết định nào vẫn thuộc về họ? |
| Thực hiện | Lớp công cụ hoặc tác nhân nào được hành động trong phạm vi nào? |
| Tài nguyên | Bao nhiêu thời gian, vùng ngữ cảnh, kiểm thử và phối hợp là vừa đủ? |
| Bằng chứng | Điều gì đã xác minh, đã quan sát, chỉ là ước tính, là mục tiêu hoặc còn chưa biết? |

## Vị trí của từng mô-đun

- Conduct bảo vệ mặt tiếp xúc với ý định người dùng.
- Lean giới hạn độ sâu thực hiện.
- Budget làm rõ việc dùng tài nguyên.
- Bridge phối hợp các lớp công cụ gốc mà không biến lời khuyên thành quyền.
- Arc tổ chức nhiều ô công việc có giới hạn.
- Evidence bảo vệ mặt tiếp xúc với kết quả.

## Quy tắc một người ghi

Đọc song song thường an toàn. Sửa song song chỉ an toàn khi phạm vi được tách rõ. Mỗi phạm vi có thể thay đổi cần một chủ sở hữu, một hợp đồng nghiệm thu và một điểm bàn giao. Người tích hợp gốc quyết định phần nào được đưa vào kết quả chung.

## Không có lõi ẩn

Dwi không có phần chạy nền bắt buộc. Một mô-đun là thư mục chứa `SKILL.md`; metadata tùy chọn của lớp công cụ có thể nằm cạnh đó. Xóa thư mục sẽ gỡ hướng dẫn khỏi phạm vi đã chọn.

## Ranh giới tương thích

Kho ghi rõ vị trí kỹ năng của Codex và Claude Code vì hai lớp công cụ này hỗ trợ kỹ năng dạng thư mục. Hành vi thực tế vẫn phụ thuộc phiên bản công cụ, mô hình, hướng dẫn dự án và cài đặt quyền. Cần thử trong phạm vi nhỏ; không được mặc định là tương thích tuyệt đối.
