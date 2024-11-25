import { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaFacebookF,
  FaGoogle,
  FaGithub,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import bg from "../../assets/others/authentication.png";
import bg2 from "../../assets/others/authentication2.png";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { createUserEmail } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email, password);

    createUserEmail(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("SignUp Successfully!");
        console.log(user);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error.message);
      });
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center flex items-center justify-center  hero-overlay bg-opacity-60"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-transparent rounded-xl overflow-hidden flex flex-col md:flex-row items-center ">
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Create an Account
            </h1>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Name"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <input
              type="submit"
              value="SignUp"
              className="w-full bg-[#D1A054] btn text-white hover:bg-[#D1A054]/90 rounded"
            />
          </form>

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
            <div className="flex items-center justify-center gap-4 mt-2">
              <p className="text-gray-600">Or </p>
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <FaFacebookF />
              </button>
              <button className="bg-red-500 text-white p-2 rounded-full">
                <FaGoogle />
              </button>
              <button className="bg-black text-white p-2 rounded-full">
                <FaGithub />
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <img src={bg2} alt="Login background" className="w-full " />
          <Toaster position="top-center" reverseOrder={true} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
