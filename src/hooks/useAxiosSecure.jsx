import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOutEmail } = useAuth();
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const requestIntercept = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          await logOutEmail();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestIntercept);
      axiosSecure.interceptors.response.eject(responseIntercept);
    };
  }, [logOutEmail, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
