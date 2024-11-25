import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const framerIcons = {
    hover: { rotate: 360, transition: { duration: 1 } },
    tap: { rotate: 0, transition: { duration: 1 } },
  };

  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-between ">
        <aside className="w-full md:w-1/2 bg-[#1F2937] flex flex-col justify-center items-center gap-y-1 text-white/70 p-10">
          <motion.h2
            whileHover={variants.hover}
            whileTap={variants.tap}
            className="text-2xl font-bold mb-2 "
          >
            CONTACT US
          </motion.h2>
          <div className="text-sm  text-center space-y-1">
            <motion.p whileHover={variants.hover} whileTap={variants.tap}>
              123 ABS Street, Uni 21, Bangladesh
            </motion.p>
            <motion.p whileHover={variants.hover} whileTap={variants.tap}>
              +88 123456789
            </motion.p>
            <motion.p whileHover={variants.hover} whileTap={variants.tap}>
              Mon - Fri: 08:00 - 22:00
            </motion.p>
            <motion.p whileHover={variants.hover} whileTap={variants.tap}>
              Sat - Sun: 10:00 - 23:00
            </motion.p>
          </div>
        </aside>
        <aside className="w-full md:w-1/2 flex flex-col justify-center items-center gap-y-3 bg-[#111827] text-white/70 p-10">
          <motion.h2
            whileHover={variants.hover}
            whileTap={variants.tap}
            className="text-2xl font-bold "
          >
            Follow US
          </motion.h2>
          <motion.p
            whileHover={variants.hover}
            whileTap={variants.tap}
            className="text-sm "
          >
            Join us on social media
          </motion.p>
          <div className="flex gap-4">
            <motion.span
              whileHover={framerIcons.hover}
              whileTap={framerIcons.tap}
            >
              <FaFacebookF className="text-2xl" />
            </motion.span>
            <motion.span
              whileHover={framerIcons.hover}
              whileTap={framerIcons.tap}
            >
              <FaTwitter className="text-2xl" />
            </motion.span>
            <motion.span
              whileHover={framerIcons.hover}
              whileTap={framerIcons.tap}
            >
              <FaYoutube className="text-2xl" />
            </motion.span>
          </div>
        </aside>
      </div>

      <div className="footer footer-center bg-[#151515] text-white/60 p-4">
        <motion.p whileHover={variants.hover} whileTap={variants.tap}>
          Copyright &copy; {new Date().getFullYear()} - All right reserved by
          Bistro Boss Restaurant
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
