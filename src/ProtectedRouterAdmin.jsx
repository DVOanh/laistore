import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = () => {
    // 1. Lấy token từ localStorage
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Bạn chưa đăng nhập!");
        return <Navigate to="/login" replace />;
    }

    try {
        // 2. Decode token để lấy dữ liệu user
        const decoded = jwtDecode(token);

        // 3. Kiểm tra role
        if (decoded.role !== "admin") {
            return <Navigate to="/" replace />;
        }

        // 4. Nếu là admin -> cho vào route con
        return <Outlet />;

    } catch (error) {
        // Token lỗi hoặc fake
        console.log("Token không hợp lệ:", error);
        return <Navigate to="/login" replace />;
    }
};

export default AdminProtectedRoute;