import { motion } from "framer-motion";
import ButtonOutline from "../Button/ButtonOutline";

const FoodCard = ({ item }) => {
  const { image, name, recipe, price } = item;

  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <div>
      <article className="overflow-hidden rounded-lg my-10 transition  shadow-lg">
        <div className="relative">
          <motion.img
            src={image}
            alt={name}
            whileHover={variants.hover}
            whileTap={variants.tap}
            className="h-56 w-full object-cover"
          />
          <button className="btn btn-neutral rounded absolute top-5 right-3 ">
            ${price}
          </button>
        </div>

        <div className="bg-white p-4 sm:p-6 text-center space-y-3">
          <motion.h3
            whileHover={variants.hover}
            whileTap={variants.tap}
            className="mt-0.5 text-lg text-gray-900"
          >
            {name}
          </motion.h3>
          <motion.p
            whileHover={variants.hover}
            whileTap={variants.tap}
            className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500"
          >
            {recipe}
          </motion.p>

          <ButtonOutline>Add to Cart</ButtonOutline>
        </div>
      </article>
    </div>
  );
};

export default FoodCard;
