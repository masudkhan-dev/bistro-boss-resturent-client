import { motion } from "framer-motion";
import ButtonOutline from "../Button/ButtonOutline";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FoodCard = ({ item }) => {
  const { image, name, recipe, price, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.5, transition: { duration: 0.2 } },
  };

  const handleAddtoCart = (food) => {
    if (user && user.email) {
      console.log(user.email, food);

      const cartItems = {
        menuId: _id,
        name,
        recipe,
        image,
        price,
      };

      axiosSecure
        .post("/carts", cartItems)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} successfully added in cart`,
            showConfirmButton: false,
            timer: 1200,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: error.code,
          });
        });
    } else {
      Swal.fire({
        title: "You are not logged In!",
        text: "Do you want to Login?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
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

          <span onClick={() => handleAddtoCart(item)}>
            <ButtonOutline>Add to Cart</ButtonOutline>
          </span>
        </div>
      </article>
    </div>
  );
};

export default FoodCard;
