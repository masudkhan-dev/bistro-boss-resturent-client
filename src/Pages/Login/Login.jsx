import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaFacebookF,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import bg from "../../assets/others/authentication.png";
import bg2 from "../../assets/others/authentication2.png";
import useAuth from "../../hooks/useAuth";
import Alert from "../../Utility/Alert/Alert";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Captcha from "../../Utility/Captcha/Captcha";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUserEmail, googleSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    if (!isVerified) {
      toast.error("Please verify the CAPTCHA first");
      return;
    }

    loginUserEmail(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success("Logged in Successfully!");
        console.log(user);
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error.message);
        navigate("/");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
          Alert.fire({
            type: "success",
            title: "Login Successful",
            text: "Your account loggedin by Google",
          });
        });
      })
      .catch((error) => {
        Alert.fire({
          type: "error",
          title: error.message,
          text: error.code,
        });
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center hero-overlay bg-opacity-60"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-transparent rounded-xl overflow-hidden flex flex-col md:flex-row-reverse items-center">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Please enter your details to login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <p> </p>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3  flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0  pr-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Reusable CAPTCHA Component */}
            <Captcha onVerify={(verified) => setIsVerified(verified)} />

            {/* Login Submit Button */}
            <input
              type="submit"
              value="Login"
              disabled={!isValid || !isVerified}
              className={`w-full btn text-white rounded ${
                isValid && isVerified
                  ? "bg-[#D1A054] hover:bg-[#D1A054]/90"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            />
          </form>

          {/* Social Login and Signup Link */}
          <div className="text-center my-2">
            <p className="text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <p className="text-gray-600">Or </p>
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <FaFacebookF />
              </button>
              <button
                onClick={handleGoogleSignIn}
                className="bg-red-500 text-white p-2 rounded-full"
              >
                <FaGoogle />
              </button>
              <button className="bg-black text-white p-2 rounded-full">
                <FaGithub />
              </button>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="md:w-1/2">
          <Link to="/">
            <img src={bg2} alt="Login background" className="w-full" />
          </Link>
          <Toaster position="top-center" reverseOrder={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
