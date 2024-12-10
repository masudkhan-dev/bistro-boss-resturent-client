import { motion } from "framer-motion";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <motion.div
        className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500"
        initial={{ backgroundSize: "200% 200%" }}
        animate={{
          backgroundSize: ["200% 200%", "400% 400%", "200% 200%"],
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <div className="text-center">
          <h1 className="text-9xl font-bold text-white">404</h1>
          <p className="text-2xl font-medium text-gray-200 mt-4">
            Oops! Page not found.
          </p>
          <p className="text-gray-300 mt-2">
            The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="inline-block bg-white hover:bg-gray-200 text-indigo-500 font-medium py-3 px-6 rounded-full mt-6"
          >
            Go back home
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
