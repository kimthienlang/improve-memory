import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const ProtectedRoute = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, cho phép hiển thị các component bên trong (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
