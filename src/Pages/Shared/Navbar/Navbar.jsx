import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

import cart from "../../../assets/icon/cart.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvater, setIsAvater] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Contact Us", path: "/contact" },
    { id: 3, name: "Dashboard", path: "/dashboard" },
    { id: 4, name: "Our Menu", path: "/menu" },
    { id: 5, name: "Our Shop", path: "/shop" },
  ];

  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 duration-700">
      <nav className="relative  shadow ">
        <div className=" max-w-screen-xl mx-auto  py-2 ">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between mx-4 py-2">
              <motion.h2 whileHover={variants.hover} whileTap={variants.tap}>
                <Link to="/" className=" text-black/80 text-xl">
                  Bistro Boss Resturent
                </Link>
              </motion.h2>

              <div className="flex lg:hidden">
                <motion.button
                  whileTap={variants.tap}
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-3xl text-black/80"
                >
                  {!isOpen ? <IoMdMenu /> : <IoMdClose />}
                </motion.button>
              </div>
            </div>

            <div
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-700 ease-in-out bg-white  text-black/80 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center shadow-xl md:shadow-none ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <motion.div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "px-3 py-2 mx-3 mt-2 transition-colors duration-700 transform rounded-md lg:mt-0  bg-[#FFA300] text-black "
                        : "px-3 py-2 mx-3 mt-2 text-black/80 transition-colors duration-700 transform rounded-md lg:mt-0  hover:bg-[#FFA300] hover:text-white "
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </motion.div>

              <div className="mt-4 lg:mt-0 space-x-5 flex items-center">
                <div className="md:dropdown md:dropdown-end">
                  <button
                    onClick={() => setIsCart(!isCart)}
                    className="avater w-12"
                  >
                    <motion.img
                      src={cart}
                      alt="add to cart"
                      className="scale-95"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </button>
                  {isCart && (
                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 px-5 py-2 shadow">
                      <p className="text-lg font-bold">8 Items</p>

                      <p className="text-lg font-bold my-2">Price: $999</p>

                      <Link className="btn btn-warning">View Cart</Link>
                    </ul>
                  )}
                </div>
                <div className="md:dropdown md:dropdown-end">
                  <button
                    onClick={() => setIsAvater(!isAvater)}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="Tailwind CSS Navbar component"
                      />
                    </div>
                  </button>
                  {isAvater && (
                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                      <li>
                        <Link>Welcome, Mr. Tom</Link>
                      </li>
                      <li>
                        <Link className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link>Settings</Link>
                      </li>

                      <button className="btn btn-error">Logout</button>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
