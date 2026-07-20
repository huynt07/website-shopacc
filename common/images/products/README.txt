Thư mục này dùng để chứa TOÀN BỘ ảnh acc/nick của site (không cần tạo
1 folder riêng cho từng acc như mẫu "DS1, DS2, DS3..." bạn gửi).

Cách dùng:
1. Copy ảnh của bạn vào thư mục này, đặt tên không dấu, không khoảng trắng.
   Ví dụ: lien-quan-1.jpg, freefire-vip.jpg, valorant-immortal.jpg ...

2. Mở file common/js/products.js, tìm đúng sản phẩm (theo "id" hoặc "title"),
   sửa dòng "image" trỏ tới file ảnh vừa thêm, dùng đường dẫn bắt đầu bằng "/"
   (root-relative) để dùng chung được cho mọi trang dù nằm ở thư mục nào:

     image: "/common/images/products/lien-quan-1.jpg",

   (Đường dẫn kiểu "/..." chỉ chạy đúng khi site được host từ domain gốc,
   ví dụ https://shopaccgame.vn/... Nếu bạn test bằng cách mở file .html
   trực tiếp trên máy (file://) thì ảnh sẽ không hiện — cần chạy qua
   1 local server, ví dụ VSCode "Live Server", hoặc "python -m http.server").
