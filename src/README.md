# 📝 Personal Task Manager (React SPA)

Một ứng dụng Single Page Application (SPA) hiện đại giúp quản lý công việc cá nhân hiệu quả với giao diện trực quan, hỗ trợ Dark Mode và hoạt động mượt mà trên mọi thiết bị.

## ✨ Tính năng nổi bật

- **Quản lý công việc (CRUD):** Thêm, sửa, xóa và cập nhật trạng thái công việc nhanh chóng.
- **Phân loại thông minh:** Tự động chia nhóm công việc theo trạng thái: *To Do*, *In Progress*, và *Done*.
- **Tìm kiếm & Lọc:** Bộ lọc mạnh mẽ theo từ khóa hoặc theo trạng thái cụ thể.
- **Quản lý Deadline:** Đặt hạn chót cho công việc, tự động hiển thị cảnh báo "Sắp đến hạn" (Due Soon) hoặc "Quá hạn" (Overdue).
- **Thống kê thời gian thực:** Theo dõi tổng số task, số task đã hoàn thành và số task đang bị quá hạn.
- **Giao diện hiện đại:** Hỗ trợ Dark Mode, hiệu ứng chuyển động mượt mà với Framer Motion và thiết kế Responsive hoàn hảo.
- **Lưu trữ dữ liệu:** Tự động đồng bộ với `localStorage`, không mất dữ liệu khi tải lại trang.

## 🛠 Công nghệ sử dụng

- **Frontend Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v4 (với CSS Variables & Theme customization)
- **Animation:** Framer Motion (Xử lý layout chuyển động và hiệu ứng xuất hiện)
- **Icons:** Lucide React
- **Date Handling:** date-fns (Xử lý logic thời gian và so sánh deadline)
- **Utilities:** `clsx` & `tailwind-merge` (Quản lý class CSS tối ưu)

## 🚀 Hướng dẫn cài đặt và chạy Local

### 1. Yêu cầu hệ thống
- Node.js (phiên bản 18.x trở lên)
- npm hoặc yarn

### 2. Cài đặt
```bash
# Clone dự án hoặc giải nén folder
cd personal-task-manager

# Cài đặt các thư viện phụ thuộc
npm install