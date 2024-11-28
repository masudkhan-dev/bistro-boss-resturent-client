import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaFacebookF,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Loader from "../../Utility/Loader/Loader";
import bg from "../../assets/others/authentication.png";
import bg2 from "../../assets/others/authentication2.png";
import { Image } from "lucide-react";
import Alert from "../../Utility/Alert/Alert";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { createUserEmail, loading, updateUserProfileEmail, googleSignIn } =
    useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    createUserEmail(data.email, data.password)
      .then(() => {
        updateUserProfileEmail(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
            };

            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Alert.fire({
                  type: "success",
                  title: "You are Successfully SignUp",
                  text: "Your registration was completed",
                });
                reset();
                navigate("/");
              }
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
    console.log(data);
  };

  if (loading) {
    return <Loader />;
  }

  const handleGoogleSignUp = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        console.log(result.user);
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          Alert.fire({
            type: "success",
            title: "Login Successful",
            text: "Your account loggedin by Google",
          });
          navigate("/");
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
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Helmet>
        <title>SignUp | Bistro Boss</title>
      </Helmet>
      <div className="bg-transparent rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Create an Account
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 80,
                    message: "Name cannot exceed 80 characters",
                  },
                })}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Full Name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Photo URL Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image className="text-gray-400" />
              </div>
              <input
                type="text"
                {...register("photoURL", {
                  required: "Profile photo URL is required",
                })}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  errors.photoURL ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Profile Photo URL"
              />
              {errors.photoURL && (
                <span className="text-red-500 text-sm">
                  {errors.photoURL.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn text-white rounded ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#D1A054] hover:bg-[#D1A054]/90"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            <div className="flex items-center justify-center gap-4 mt-2">
              <p className="text-gray-600">Or </p>
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <FaFacebookF />
              </button>
              <button
                onClick={handleGoogleSignUp}
                className="bg-red-500 text-white p-2 rounded-full"
              >
                <FaGoogle />
              </button>
              <button className="bg-black text-white p-2 rounded-full">
                <FaGithub />
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center my-2">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="md:w-1/2">
          <Link to="/">
            <img src={bg2} alt="Sign Up background" className="w-full" />
          </Link>
        </div>
      </div>

      {/* Ensure Toaster is placed here */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignUp;
