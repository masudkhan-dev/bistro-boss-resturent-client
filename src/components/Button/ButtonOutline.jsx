import { motion } from "framer-motion";

const ButtonOutline = ({ btn }) => {
  return (
    <div className="my-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 0.9, rotate: 10 }}
        drag
        dragSnapToOrigin={true}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="btn btn-outline border border-b-4 rounded-none shadow-xl"
      >
        {btn}
      </motion.button>
    </div>
  );
};

export default ButtonOutline;
