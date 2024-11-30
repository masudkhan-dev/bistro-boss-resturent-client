import { motion } from "framer-motion";
import ButtonOutline from "../Button/ButtonOutline";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Alert from "../../Utility/Alert/Alert";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { image, name, recipe, price, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.5, transition: { duration: 0.2 } },
  };

  const handleAddtoCart = (food) => {
    if (user && user.email) {
      const userEmail = user.email;
      console.log(user.email, food);

      const cartItems = {
        menuId: _id,
        name,
        recipe,
        image,
        price,
        userEmail,
      };

      axiosSecure
        .post(`/carts`, cartItems)
        .then(() => {
          Alert.fire({
            type: "success",
            title: `${name} successfully added in cart`,
            text: `$ ${price}`,
          });
          refetch();
        })
        .catch((error) => {
          Alert.fire({
            type: "error",
            title: error.message,
            text: error.code,
          });
        });
    } else {
      Alert.fire({
        type: "delete",
        title: "You are not logged In!",
        text: "Do you want to Login?",
        confirmButtonText: "Yes Login",
        cancelButtonText: "No",
        onConfirm: () => {
          navigate("/login", { state: { from: location } });
        },
        onCancel: () => console.log("Login Cancelled"),
      });
    }
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

          <span onClick={handleAddtoCart}>
            <ButtonOutline>Add to Cart</ButtonOutline>
          </span>
        </div>
      </article>
    </div>
  );
};

export default FoodCard;
