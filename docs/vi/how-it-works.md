# Dwi hoạt động như thế nào

Dwi tạo cho công việc một hình dạng có thể nhìn thấy trước khi agent bắt đầu hành động.

Dwi không thêm runtime ẩn và không thay thế mô hình quyền của lớp công cụ gốc. Dwi bổ sung các chỉ dẫn có thể kiểm tra để giữ kết quả, phạm vi, thẩm quyền, quyền sở hữu, tài nguyên và bằng chứng rõ ràng trong workflow agent hiện có.

## Bắt đầu bằng một packet

Packet là một phần việc hoàn chỉnh. Nó cho agent biết:

| Trường | Câu hỏi |
| --- | --- |
| Ý định | Điều gì cần trở thành sự thật? |
| Ngữ cảnh | Agent cần biết điều gì? |
| Thẩm quyền | Agent được phép đọc, thay đổi, quyết định hoặc gây ra điều gì? |
| Bằng chứng | Điều gì phải được trả lại trước khi kết quả được tin cậy? |

Một packet hữu ích cũng nêu rõ:

- đích hoàn thành;
- phạm vi có thể thay đổi;
- phần không được chạm vào;
- writer của phạm vi đó;
- phép kiểm tra nhỏ nhất đủ dùng;
- quyết định quan trọng nào phải trở lại với con người.

Công việc lúc này tự mang theo nhiều ký ức vận hành hơn. Con người không phải dựng lại mục tiêu và ranh giới ở mỗi lần bàn giao.

## Chỉ chọn mô-đun thật sự liên quan

Dwi được thiết kế theo mô-đun.

- Dùng **Conduct** khi giao tiếp hoặc một câu hỏi chặn công việc trở nên khó trả lời.
- Dùng **Lean** khi công việc phình ra ngoài kết quả được yêu cầu.
- Dùng **Budget** khi tài nguyên hoặc checkpoint cần một ranh giới trung thực.
- Dùng **Bridge** khi lời khuyên hoặc thực thi đi qua nhiều lớp công cụ gốc.
- Dùng **Arc** khi nhiều ô công việc thật sự tách rời cần quyền sở hữu và tích hợp.
- Dùng **Evidence** khi các nhận định quan trọng cần trạng thái, nguồn gốc và điều chưa biết.
- Chỉ dùng **All-in-One** khi nhiều áp lực đã quan sát lặp lại cùng lúc. All-in-One chọn các lớp liên quan thay vì buộc mọi tác vụ chạy đủ sáu lớp.

Mô-đun nhỏ nhất đủ giải quyết vấn đề thường là điểm bắt đầu tốt nhất.

## Dùng năng lực suy luận mạnh ở nơi làm thay đổi quyết định

Một cách triển khai Arc hợp lệ là dùng model có năng lực cao cho việc lập kế hoạch, chia nhỏ, tích hợp và đánh giá, còn model tiết kiệm hơn xử lý các bước rõ ràng và có giới hạn.

Đây là mô hình tùy chọn. Arc không bắt buộc nhà cung cấp, dòng model hoặc mức giá cụ thể.

Quy tắc đơn giản hơn là:

> Dành suy luận mạnh cho quyết định, không dành cho sự lặp lại.

## Công việc song song cần sự độc lập thật sự

Công việc chỉ nên chạy song song khi các làn không phụ thuộc cùng tập tin có thể thay đổi hoặc cùng một quyết định chưa được giải quyết.

Mỗi làn cần:

- một câu hỏi hoặc phạm vi ghi có giới hạn;
- một writer cho nội dung có thể thay đổi;
- một điều kiện nghiệm thu;
- một phần bằng chứng trả về;
- một điểm tích hợp rõ ràng.

Root sở hữu kết quả người dùng và quyết định phần nào được đưa vào kết quả chung.

Thực thi song song có thể rút ngắn thời gian khi các làn thật sự độc lập. Đây không phải tốc độ tăng tự động và không nên được mô tả là tăng theo cấp số nhân.

## Công việc không tự phê duyệt chính mình

Dwi tách một kết quả trôi chảy khỏi bằng chứng.

Một tuyến bằng chứng hữu ích là:

```text
Nhận định
→ Tạo tác
→ Xác minh
→ Kiểm tra độc lập
→ Quyết định của con người
```

Mỗi làn trả lại bằng chứng. Root kiểm tra cách các phần được ghép lại. Một cổng độc lập có thể phản biện kết quả mà không mang cùng giả định với writer. Người có thẩm quyền quyết định điều gì được chấp nhận.

Các loại bằng chứng vẫn phải tách biệt:

- bằng chứng tĩnh kiểm tra file, cấu trúc, cấu hình hoặc cú pháp;
- bằng chứng runtime quan sát hệ thống liên quan trong khi chạy;
- bằng chứng con người ghi nhận quyết định hoặc phán đoán chỉ người có thẩm quyền mới có thể cung cấp.

Một loại không được âm thầm thay thế loại khác.

## Dừng tại một ranh giới có ý nghĩa

Vòng vận hành là:

```text
Công việc
→ Checkpoint
→ Bằng chứng
→ Con người xem xét
→ Tiếp tục, thu hẹp hoặc dừng
```

Dừng tại ranh giới là hành vi đúng khi:

- thiếu thẩm quyền;
- tác động tiếp theo không thể hoàn tác hoặc đi ra hệ thống bên ngoài;
- bằng chứng chưa đủ cho nhận định;
- quyền sở hữu chồng lấn;
- đích được yêu cầu đã hoàn thành;
- phần việc tiếp theo chưa chứng minh được giá trị.

## Một ví dụ nhỏ

```text
Ý định:
Cập nhật một đoạn hướng dẫn cài để phạm vi rõ ràng.

Ngữ cảnh:
Dùng bản hướng dẫn cài tiếng Anh và tiếng Việt hiện tại.

Thẩm quyền:
Chỉ sửa hai file tài liệu đó. Không sửa mô-đun, tag hoặc release.

Bằng chứng:
Hiển thị diff chính xác, kiểm tra link nội bộ và nêu điều còn chưa chắc.

Writer:
Một writer tài liệu.

Đích hoàn thành:
Hai phiên bản ngôn ngữ truyền đạt cùng một ý nghĩa vận hành.
```

Packet này đủ nhỏ để thực hiện trực tiếp. Nó không cần Arc, một chiến dịch kiểm thử rộng hoặc một hệ thống điều phối mới.

## Đọc tiếp

- [Kiến trúc](architecture.md)
- [Nguyên tắc vận hành](principles.md)
- [Chính sách bằng chứng](evidence.md)
- [Mô hình an toàn](safety.md)
- [Hướng dẫn cài đặt](installation.md)
