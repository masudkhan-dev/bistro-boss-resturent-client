import { motion } from "framer-motion";
import { Parallax } from "react-parallax";

const Cover = ({ img, title, details }) => {
  return (
    <div>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero h-[500px]">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center ">
            <div className="bg-black/50 text-white px-10 py-10 md:py-16 rounded-lg w-7xl mx-auto">
              <motion.h1
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 1.5 }}
                className="mb-5 text-4xl md:text-5xl font-bold md:tracking-[5px] cinzel uppercase"
              >
                {title}
              </motion.h1>
              <motion.p
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.5 }}
                className="mb-5 md:leading-8 text-sm md:text-base md:tracking-[2px] uppercase cinzel"
              >
                {details}
              </motion.p>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Cover;
