# Chính sách bằng chứng

Dwi xem độ chắc là dữ liệu có cấu trúc, không phải giọng nói tự tin.

## Nhãn cho nhận định

| Nhãn | Nghĩa | Bằng chứng tối thiểu |
| --- | --- | --- |
| `VERIFIED (ĐÃ XÁC MINH)` | Một phép kiểm tra đã định nghĩa chạy thành công trong môi trường được nêu | Lệnh, validator (công cụ kiểm tra), artifact (kết quả lưu lại) hoặc phê duyệt của người có thẩm quyền, kèm phạm vi và thời điểm |
| `OBSERVED (ĐÃ QUAN SÁT)` | Một việc đã xảy ra trong một trường hợp có giới hạn | Mô tả trường hợp, nguồn, phạm vi và thời điểm |
| `ESTIMATED (ƯỚC TÍNH)` | Một con số hoặc kết luận gần đúng có lập luận | Phương pháp, giả định và mức chưa chắc |
| `TARGET (MỤC TIÊU)` | Kết quả mong muốn trong tương lai | Người chịu trách nhiệm và điều kiện chấp nhận |
| `UNKNOWN (CHƯA BIẾT)` | Bằng chứng chưa có hoặc chưa đủ | Phép kiểm tra hoặc quyết định còn thiếu |

## Một bản ghi bằng chứng cần trả lời

1. Nhận định chính xác là gì?
2. Ai hoặc công cụ nào tạo ra bằng chứng?
3. Bằng chứng thuộc môi trường và phạm vi nào?
4. Nó được quan sát khi nào?
5. Phương pháp hoặc phép kiểm tra nào đã được dùng?
6. Điều gì thất bại, bị loại trừ hoặc vẫn chưa biết?

## Bằng chứng tĩnh, lúc chạy và từ con người

- Bằng chứng tĩnh xem file, cấu trúc, cấu hình hoặc cú pháp.
- Bằng chứng lúc chạy quan sát hành vi khi hệ thống liên quan đang hoạt động.
- Bằng chứng từ con người ghi lại quyết định, đánh giá hoặc trải nghiệm chỉ người đó mới có thể cung cấp.

Một loại bằng chứng không được âm thầm thay thế loại khác.

## Quan sát nghiên cứu trước phát hành

Quan sát nghiên cứu còn là bằng chứng riêng tư cho đến khi nguồn được duyệt để công bố. Không đưa số liệu đó vào phần giới thiệu công khai nếu chưa có mã nguồn ổn định, mẫu số, phương pháp, môi trường, phần loại trừ và lưu ý dễ hiểu.

## Giữ lại thất bại

Một lần thử thất bại vẫn là bằng chứng về chính lần thử đó. Giữ loại thất bại và phạm vi. Không biến lỗi kết nối thành kết luận về sản phẩm, cũng không bỏ kết quả bất lợi chỉ để câu chuyện đẹp hơn.
