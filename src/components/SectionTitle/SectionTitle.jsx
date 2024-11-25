import { motion } from "framer-motion";

const SectionTitle = ({ heading, subHeading }) => {
  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <div className="md:w-fit mx-auto text-center">
      <motion.p
        whileHover={variants.hover}
        whileTap={variants.tap}
        className="text-[#D99904] italic mb-5 text-base"
      >
        ---{subHeading}---
      </motion.p>

      <motion.h2
        whileHover={variants.hover}
        whileTap={variants.tap}
        className="text-4xl font-bold text-black/70 my-3 border-y-4 border-[#E8E8E8] py-3 uppercase"
      >
        {heading}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
