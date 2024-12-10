import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

// useAdmin.js
const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) {
          return false;
        }
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.admin;
      } catch (error) {
        console.error("Admin check error:", error);
        return false;
      }
    },
    retry: false,
  });
};

export default useAdmin;
