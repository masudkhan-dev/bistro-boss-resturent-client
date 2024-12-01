import {
  AlignJustify,
  BookText,
  Calendar1,
  House,
  List,
  Mail,
  ShoppingBag,
  ShoppingCart,
  Star,
  Users,
  Utensils,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  // const { data: isAdmin } = useAdmin();
  const isAdmin = true;

  console.log(isAdmin);

  return (
    <div className="flex">
      <div className="w-64 bg-[#D1A054] min-h-full pb-2 ">
        <div className="text-center mb-5">
          <h2 className="btn btn-sm btn-ghost ">Bistro Boss Resturent</h2>
          <p className="text-xl font-bold btn btn-ghost btn-sm">
            {isAdmin ? "Admin Panel" : "Dashboard"}
          </p>
        </div>

        <ul className="menu  space-y-3">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className="flex items-center">
                  <House className="w-5 h-5" />
                  Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/addItems"
                  className="flex items-center"
                >
                  <Utensils className="w-5 h-5" />
                  Add Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageItems" className="flex items-center">
                  <List className="w-5 h-5" />
                  Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manageBookings"
                  className="flex items-center"
                >
                  <BookText className="w-5 h-5" />
                  Manage Bookings
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/allusers" className="flex items-center">
                  <Users className="w-5 h-5" />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className="flex items-center">
                  <House className="w-5 h-5" />
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/reservation"
                  className="flex items-center"
                >
                  <Calendar1 className="w-5 h-5" />
                  Reservation
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/cart" className="flex items-center">
                  <ShoppingCart className="w-5 h-5" />
                  My Cart ({cart.length})
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manageItems"
                  className="flex items-center"
                >
                  <Star className="w-5 h-5" />
                  Add Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/bookings" className="flex items-center">
                  <BookText className="w-5 h-5" />
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="border-t border w-full my-5"></div>

        <ul className="menu space-y-3">
          <li>
            <NavLink to="/" className="flex items-center">
              <House className="w-5 h-5" />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/order/salad" className="flex items-center">
              <AlignJustify className="w-5 h-5" />
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/shop" className="flex items-center">
              <ShoppingBag className="w-5 h-5" />
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/contact" className="flex items-center">
              <Mail className="w-5 h-5" />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
