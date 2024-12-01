import { FaHashtag } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import { Trash2 } from "lucide-react";
import Alert from "../../../Utility/Alert/Alert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handleDelete = (id) => {
    Alert.fire({
      type: "delete",
      title: "Delete Item?",
      text: "Are you sure you want to delete this?",
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Keep Item",
      onConfirm: () => {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            Alert.fire({
              type: "success",
              title: "Deleted Successful",
              text: "Your cart was deleted",
            });
            refetch();
          } else {
            Alert.fire({
              type: "error",
              title: "Delate faild",
              text: "Something went wrong",
            });
          }
        });
      },
      onCancel: () => console.log("Deletion Cancelled"),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h2 className="text-4xl font-bold">Total Items: {cart.length} </h2>
        <h2 className="text-4xl font-bold">Total Price: ${totalPrice} </h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button className="btn btn-disabled">Pay</button>
        )}
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <FaHashtag />
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost text-red-500 text-xl"
                  >
                    <Trash2 />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
