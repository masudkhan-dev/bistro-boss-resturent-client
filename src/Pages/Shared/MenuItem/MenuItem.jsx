import { motion } from "framer-motion";
import Alert from "../../../Utility/Alert/Alert";

const MenuItem = ({ item }) => {
  const { image, name, price, recipe } = item;

  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.2 } },
  };

  const handlePrice = () => {
    // Alert.fire({
    //   type: "delete",
    //   title: "Delete Item?",
    //   text: "Are you sure you want to delete this?",
    //   confirmButtonText: "Yes Delete",
    //   cancelButtonText: "Keep Item",
    //   onConfirm: () => console.log("Item Deleted"),
    //   onCancel: () => console.log("Deletion Cancelled"),
    // });
    //
    // Alert.fire({
    // type: "success",
    // title: "Operation Successful",
    // text: "Your action was completed"
    // });

    //

    //
    Alert.fire({
      type: "error",
      title: "Error Occurred",
      text: "Something went wrong",
    });
    //
    //
    //
    //
  };

  return (
    <div>
      <article className="flex bg-white transition">
        <div className="">
          <motion.img
            whileHover={variants.hover}
            whileTap={variants.tap}
            src={image}
            alt={name}
            className="aspect-square h-40 w-40 object-cover rounded-tr-full rounded-b-full"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className=" p-4 sm:p-6">
            <motion.h3
              whileHover={variants.hover}
              whileTap={variants.tap}
              className="font-bold uppercase text-gray-900"
            >
              {name} ----------
            </motion.h3>

            <motion.p
              whileHover={variants.hover}
              whileTap={variants.tap}
              className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700"
            >
              {recipe}
            </motion.p>
          </div>

          <div className="sm:flex sm:items-end sm:justify-end">
            <motion.button
              onClick={handlePrice}
              whileHover={variants.hover}
              whileTap={variants.tap}
              whileDrag={{ scale: 0.9, rotate: 10 }}
              drag
              dragSnapToOrigin={true}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="btn btn-warning rounded px-8"
            >
              ${price}
            </motion.button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MenuItem;
