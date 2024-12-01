import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FilePenLine, Trash } from "lucide-react";
import Alert from "../../../Utility/Alert/Alert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Loader from "../../../Utility/Loader/Loader";
import Error from "../../../Utility/Error/Error";

const ManageItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["manage Item"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });

  const handleDeleteItem = (item) => {
    Alert.fire({
      type: "delete",
      title: "Delete Item?",
      text: "Are you sure you want to delete this?",
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Keep It",
      onConfirm: async () => {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Alert.fire({
            type: "success",
            title: `${item.name} is deleted successfully`,
            text: `${item.name} had been complatly deleted`,
          });

          refetch();
        }
      },
      onCancel: () => console.log("Deletion Cancelled"),
    });
  };

  const handleUpdteItem = (item) => {
    console.log("item update");
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div>
      <div>
        <SectionTitle subHeading="Hurry Up" heading="Manage All Items" />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((menuItem, index) => (
                <tr key={index}>
                  <td> {index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={menuItem.image} alt={menuItem.name} />
                      </div>
                    </div>
                  </td>
                  <td>{menuItem.name}</td>
                  <td>$ {menuItem.price}</td>
                  <td>
                    <Link to={`/dashboard/updateItem/${menuItem._id}`}>
                      <button
                        onClick={handleUpdteItem}
                        className="btn btn-warning"
                      >
                        <FilePenLine />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(menuItem)}
                      className="btn btn-error "
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
