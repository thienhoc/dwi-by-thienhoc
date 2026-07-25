# Hướng dẫn nội dung và công bố

Tài liệu này bảo vệ ý nghĩa của Dwi trong tài liệu repository, nội dung website, release note, ví dụ và thay đổi từ contributor.

Mục tiêu không phải làm mọi trang có cùng một giọng tuyệt đối. Mục tiêu là giữ nguyên sự thật sản phẩm trong khi điều chỉnh độ sâu và ví dụ cho từng nhóm người đọc.

## Bắt đầu từ con người

Trình tự ưu tiên:

```text
Tình huống của con người
→ Gánh nặng bị ẩn
→ Điều gì thay đổi
→ Cơ chế Dwi
→ Bằng chứng hoặc giới hạn
→ Bước tiếp theo
```

Làm cho vấn đề của con người hiện rõ trước khi giới thiệu Dwi.

Tránh mở đầu như một danh sách tính năng:

```text
Dwi làm việc này.
Dwi còn làm việc kia.
Dwi có thêm một tính năng khác.
```

## Giọng điệu

Giọng hoàn chỉnh kết hợp:

1. nội dung sản phẩm gọn;
2. giải thích con người khiêm tốn;
3. độ chính xác kỹ thuật có ý thức về bằng chứng.

Dùng giọng bình tĩnh, trực tiếp, có tính người, chính xác và tiết chế.

Dùng động từ cụ thể như:

```text
đọc
chọn
giới hạn
xác minh
quan sát
gỡ bỏ
dừng
```

Tránh ngôn ngữ phóng đại như:

```text
cách mạng
tự chủ hoàn toàn
liền mạch tuyệt đối
ma thuật
được bảo đảm
phổ quát
xóa bỏ hỗn loạn
không bao giờ xung đột
hoạt động với mọi thứ
```

## Quy tắc viết

- Mỗi headline chỉ mang một ý.
- Giữ đoạn văn ngắn.
- Không lặp lại cùng một lập luận bằng nhiều cách nói.
- Dùng ngôn ngữ thông thường khi đã đủ nghĩa.
- Giải thích ý đơn giản trước thuật ngữ kỹ thuật.
- Giải thích từ chuyên môn ở lần dùng đầu hoặc link tới glossary.
- Không dùng ký tự gạch ngang dài.
- Không lặp cùng một cấu trúc câu qua nhiều phần.
- Không làm người mới cảm thấy kém.
- Không yêu cầu người chuyên nghiệp chấp nhận claim mơ hồ.
- Không biến trải nghiệm cá nhân thành bằng chứng phổ quát.
- Giữ ý nghĩa vận hành tiếng Anh và tiếng Việt cùng tiến hóa.

## Thuật ngữ sản phẩm

Dùng thứ bậc sau:

- **Category:** Lớp tính người cho tác nhân AI.
- **Hình thức sản phẩm:** một lớp tính người dạng mô-đun.
- **Chức năng dễ hiểu:** một lớp vận hành giữ ý định, phạm vi, thẩm quyền, quyền sở hữu, tài nguyên và bằng chứng có thể nhìn thấy.
- **Gói kỹ thuật:** Agent Skills khi giải thích đường discovery hoặc cài đặt tương thích.

Không định vị Dwi là:

- một model khác;
- runtime ẩn;
- hệ thống cấp quyền;
- framework All-in-One bắt buộc;
- lớp tương thích phổ quát.

## Cách mô tả mô-đun

Các mô-đun chuyên biệt vẫn là đơn vị sản phẩm chính.

All-in-One phải được mô tả là:

> Mô-đun phối hợp tùy chọn, chỉ chọn các lớp Dwi thật sự liên quan khi nhiều áp lực đã quan sát lặp lại cùng lúc.

Không nói All-in-One luôn chạy đủ sáu lớp. Không gọi nó là lớp kiến trúc thứ bảy.

Arc phải giữ tính độc lập với model. Root mạnh phối hợp các cell thực thi tiết kiệm hơn chỉ được mô tả là một cách triển khai tùy chọn.

## Guardrail cho bằng chứng và claim

- Luôn gắn nhãn số liệu sử dụng cá nhân là do tác giả tự ghi nhận.
- Không trình bày quy mô sử dụng cá nhân như bằng chứng độc lập.
- Không hứa tiết kiệm token trong mọi trường hợp.
- Không hứa tăng tốc trong mọi trường hợp.
- Không mô tả thực thi song song là tăng tốc theo cấp số nhân.
- Không tự động xem cached input là tiền tiết kiệm.
- Giữ từng case quan sát trong đúng phạm vi và giới hạn của nó.
- Xem đầu ra trôi chảy hoặc trau chuốt là một claim, không phải bằng chứng.
- Tách bằng chứng tĩnh, runtime và con người.
- Giữ lại phép kiểm tra thất bại, phần bị loại và điều chưa biết.
- Giữ thẩm quyền con người là điểm quyết định cuối cùng.

Mọi con số công khai cần:

- mã nguồn ổn định;
- mẫu số;
- phương pháp;
- môi trường và phạm vi;
- phần bị loại;
- giới hạn bằng ngôn ngữ dễ hiểu.

Khi chưa có đủ các trường này, bỏ con số hoặc gắn `ESTIMATED` cùng phương pháp và độ bất định.

## Cách viết về tương thích

Ưu tiên:

> Có hồ sơ quan sát tương thích có giới hạn cho Codex và Claude Code.

Tránh:

> Hoạt động với Codex và Claude Code.

> Đã thử nghiệm với Codex và Claude Code.

trừ khi câu chính xác được link tới bằng chứng hỗ trợ đúng phạm vi, phiên bản lớp công cụ, môi trường, mô-đun, phương pháp và ngày.

## Cách viết về tốc độ và hiệu quả

Ưu tiên:

> Làm song song có thể rút ngắn thời gian khi các làn thật sự độc lập.

> Model có năng lực có thể tập trung vào lập kế hoạch và phán đoán, còn các bước thực thi có giới hạn dùng model khác.

Tránh:

> Dwi làm công việc nhanh hơn theo cấp số nhân.

> Dwi tự động tiết kiệm token và tiền.

Claim về hiệu quả phải nêu baseline, tử số, mẫu số, môi trường và độ bất định.

## Cấu trúc case study

Một case hữu ích nên gồm:

```text
Tình huống của con người
Điều thường xảy ra sai
Vì sao nó trở nên nặng đầu
Dwi thay đổi điều gì
Dwi không giải quyết điều gì
Workflow ví dụ
Bằng chứng cần yêu cầu
Bước tiếp theo an toàn
Mô-đun liên quan
Tài liệu liên quan
```

Metadata đề xuất:

```yaml
title:
description:
audience:
reading_time:
primary_module:
supporting_modules:
evidence_status:
last_reviewed:
```

Không công bố một case chỉ có khung rỗng. Chỉ thêm case khi tình huống, giới hạn, bằng chứng cần yêu cầu và bước tiếp theo an toàn đã hoàn chỉnh.

## Đồng nghĩa tiếng Anh và tiếng Việt

Đồng nghĩa quan trọng hơn dịch từng câu theo nghĩa đen.

Với thay đổi hướng tới người dùng, xác minh hai ngôn ngữ cùng giữ:

- cùng ranh giới thẩm quyền;
- cùng giới hạn an toàn;
- cùng trạng thái release;
- cùng phạm vi bằng chứng;
- cùng hành vi mô-đun;
- cùng hành động tiếp theo.

Không tạo claim mạnh hơn ở một ngôn ngữ.

## Checklist review

Trước khi merge nội dung công khai, xác nhận:

- con người và gánh nặng bị ẩn xuất hiện trước cơ chế;
- mô tả mô-đun khớp `SKILL.md` hiện tại;
- claim tương thích và hiệu năng có phạm vi;
- số liệu có bằng chứng hoặc được loại bỏ;
- All-in-One có relevance gate;
- thực thi song song phụ thuộc sự độc lập;
- quyết định cuối cùng vẫn thuộc về con người;
- ý nghĩa tiếng Anh và tiếng Việt khớp nhau;
- link nội bộ trỏ tới nguồn sự thật hiện tại;
- không có claim release hoặc trạng thái đi trước repository thật.

## Tài liệu liên quan

- [Hệ thống thương hiệu](../brand.md)
- [Chính sách bằng chứng](evidence.md)
- [Mô hình an toàn](safety.md)
- [Nguyên tắc vận hành](principles.md)
- [Đóng góp](../../CONTRIBUTING.md)
