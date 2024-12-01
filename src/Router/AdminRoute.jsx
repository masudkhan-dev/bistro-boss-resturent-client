import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loader from "../Utility/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading } = useAdmin();
  const location = useLocation();

  if (loading || isLoading) {
    return <Loader />;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
