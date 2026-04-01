import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const GuestRoute = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    // Nếu đã đăng nhập, chuyển hướng về trang chủ
    return <Navigate to="/" replace />;
  }

  // Nếu chưa đăng nhập, cho phép hiển thị các component bên trong (Outlet)
  return <Outlet />;
};

export default GuestRoute;
