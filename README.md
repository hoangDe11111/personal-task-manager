# 📝 Quản Lý Công Việc Cá Nhân (Personal Task Manager)

Ứng dụng quản lý công việc (To-do list) hiện đại, tập trung vào trải nghiệm người dùng, hiệu năng mượt mà và khả năng lưu trữ ngoại tuyến. Được xây dựng dưới dạng **Single Page Application (SPA)**.

## ✨ Tính năng chính

- **Quản lý công việc (CRUD):** Thêm, sửa, xóa và cập nhật trạng thái công việc nhanh chóng.
- **Phân loại thông minh:** Tự động chia nhóm công việc theo 3 trạng thái: *To Do*, *In Progress*, và *Done*.
- **Tìm kiếm & Lọc:** Tìm kiếm theo tên công việc hoặc lọc nhanh theo trạng thái.
- **Theo dõi Deadline:** Đặt hạn chót cho từng task, tự động hiển thị cảnh báo "Sắp đến hạn" (Due Soon) hoặc "Quá hạn" (Overdue).
- **Thống kê nhanh:** Theo dõi tổng số task, số lượng task đã hoàn thành và số lượng task quá hạn ngay trên Dashboard.
- **Chế độ tối (Dark Mode):** Bảo vệ mắt và cá nhân hóa giao diện người dùng.
- **Lưu trữ dữ liệu:** Sử dụng `localStorage` để dữ liệu không bị mất khi đóng trình duyệt.
- **Giao diện Responsive:** Hiển thị tối ưu trên cả Mobile, Tablet và Desktop.

## 🛠 Công nghệ sử dụng

- **Core:** React 18 (Vite)
- **Styling:** Tailwind CSS v4 (Sử dụng hệ thống biến CSS hiện đại)
- **Animation:** Framer Motion (Xử lý các hiệu ứng chuyển cảnh mượt mà)
- **Icons:** Lucide React
- **Xử lý thời gian:** date-fns (Tính toán chính xác logic deadline)
- **Quản lý dữ liệu:** Custom Hook `useLocalStorage`

## 🚀 Hướng dẫn cài đặt và chạy Local

### 1. Yêu cầu hệ thống
- Node.js (phiên bản 18.x trở lên)
- npm hoặc yarn

### 2. Cài đặt
```bash
# Di chuyển vào thư mục dự án
cd personal-task-manager

# Cài đặt các thư viện phụ thuộc
npm install
```
### 3. Khởi chạy
```bash
# Chạy ứng dụng ở chế độ phát triển
npm run dev
```
Truy cập ứng dụng tại: [http://localhost:5173](http://localhost:5173)

---

## 💡 Giải thích các quyết định kỹ thuật

Để giải quyết đề bài một cách tối ưu, tôi đã đưa ra các quyết định kỹ thuật sau:

* **Sử dụng `useMemo` cho Thống kê & Bộ lọc:** Thay vì tính toán lại mỗi khi component render, tôi sử dụng `useMemo` để tính toán số lượng task và danh sách lọc. Điều này giúp ứng dụng duy trì tốc độ phản hồi cực nhanh ngay cả khi danh sách công việc lên tới hàng trăm task.
* **Custom Hook `useLocalStorage`:** Tách biệt logic truy vấn dữ liệu ra khỏi UI component. Hook này đảm bảo trạng thái ứng dụng và `localStorage` luôn đồng bộ, đồng thời xử lý các lỗi tiềm ẩn khi parse dữ liệu JSON.
* **Logic Cảnh báo Deadline (Phần mở rộng từ đề bài):** Tôi đã thiết lập 3 cấp độ cảnh báo để tối ưu trải nghiệm:
    * **Quá hạn (Đỏ):** Task chưa xong và ngày hiện tại đã vượt quá hạn chót.
    * **Sắp đến hạn (Vàng):** Cảnh báo khi hạn chót nằm trong vòng 2 ngày tới.
    * **Bình thường (Xám):** Các task còn lại có hạn xa hơn.
* **Trải nghiệm người dùng (UX):**
    * Sử dụng `AnimatePresence` của **Framer Motion** để tạo hiệu ứng "bay" vào/ra khi thêm hoặc xóa task, giúp giao diện không bị giật cục.
    * Tích hợp **Dark Mode** dựa trên class CSS để tương thích tốt với hệ điều hành của người dùng.

## 📈 Những điểm sẽ cải thiện nếu có thêm thời gian

Mặc dù ứng dụng đã đáp ứng đầy đủ yêu cầu, nhưng tôi tin rằng có thể nâng cấp thêm để sản phẩm trở nên hoàn thiện hơn:

1.  **Kéo thả (Drag & Drop):** Tích hợp thư viện `@hello-pangea/dnd` để người dùng có thể kéo thả task giữa các cột trạng thái (Kanban style).
2.  **Phân loại (Categories/Tags):** Thêm tính năng gắn thẻ cho công việc (ví dụ: Công việc, Cá nhân, Khẩn cấp) để lọc dữ liệu sâu hơn.
3.  **Hệ thống thông báo (Toasts):** Thêm các thông báo nhỏ khi thực hiện hành động (Thêm thành công, Xóa thành công) để phản hồi người dùng rõ ràng hơn.
4.  **Unit Testing:** Viết các bản kiểm thử tự động cho logic tính toán deadline và bộ lọc để đảm bảo ứng dụng không phát sinh lỗi khi mở rộng tính năng.
5.  **Quản lý State tập trung:** Chuyển đổi sang **React Context** hoặc **Zustand** nếu quy mô ứng dụng lớn hơn để quản lý dữ liệu sạch sẽ hơn.

---
Người thực hiện: **Nguyễn Hoàng Đệ**
