import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const AnimatedBackground = () => {
  const bubbleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i) => ({
      opacity: [0, 0.7, 0],
      scale: [0, 1.5, 2],
      transition: {
        duration: 4,
        delay: i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-100">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-indigo-200/30 rounded-full"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const loadAnimation = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
      setIsLoaded(true);
    };
    loadAnimation();
  }, [controls]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <div className="max-w-4xl w-full mx-auto py-16 px-6 z-10 relative">
        <motion.div
          className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaPhone size={36} />,
                title: "Phone",
                content: "(123) 456-7890",
                delay: 0.1,
              },
              {
                icon: <FaMapMarkerAlt size={36} />,
                title: "Address",
                content: "123 Main St, Anytown USA",
                delay: 0.2,
              },
              {
                icon: <FaClock size={36} />,
                title: "Working Hours",
                content: "Mon - Fri: 08:00 - 22:00\nSat - Sun: 10:00 - 23:00",
                delay: 0.3,
              },
            ].map(({ icon, title, content, delay }) => (
              <motion.div
                key={title}
                className="bg-white/70 p-8 rounded-2xl shadow-lg justify-center items-center transform hover:scale-105 transition duration-300 flex flex-col"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay, ease: "easeOut" }}
              >
                <div className="text-indigo-600 mr-6">{icon}</div>
                <div className="text-center mt-5">
                  <h3 className="text-xl font-bold my-2 text-gray-800">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-lg whitespace-pre-line">
                    {content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Get in Touch
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Name", "Email"].map((label) => (
                  <div key={label}>
                    <label
                      htmlFor={label.toLowerCase()}
                      className="block text-gray-700 font-semibold mb-2 text-lg"
                    >
                      {label}
                    </label>
                    <input
                      type={label === "Email" ? "email" : "text"}
                      id={label.toLowerCase()}
                      name={label.toLowerCase()}
                      className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold mb-2 text-lg"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2 text-lg"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                  placeholder="Enter your message"
                  rows="5"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-bold text-lg py-3 px-8 rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
