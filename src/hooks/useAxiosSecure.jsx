import axios from "axios";

export const secure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  return secure;
};

export default useAxiosSecure;
