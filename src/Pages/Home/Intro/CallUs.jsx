import { motion } from "framer-motion";

const CallUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="md:w-1/2 mx-auto text-center py-10 my-10 bg-black text-white"
    >
      <motion.h2
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="md:text-4xl text-2xl font-bold cinzel"
      >
        Call Us: +88 0192345678910
      </motion.h2>
    </motion.div>
  );
};

export default CallUs;
