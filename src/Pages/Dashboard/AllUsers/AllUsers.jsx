import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../Utility/Loader/Loader";
import { Trash2, Users } from "lucide-react";
import Alert from "../../../Utility/Alert/Alert";
import Error from "../../../Utility/Error/Error";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/users/${id}`)
      .then((res) => {
        Alert.fire({
          type: "delete",
          title: "Delete Item?",
          text: "Are you sure you want to delete this?",
          confirmButtonText: "Yes Delete",
          cancelButtonText: "No Keep Him",
          onConfirm: () => {
            Alert.fire({
              type: "success",
              title: "Delete Successful",
              text: `${users.name} was deleted`,
            });
            refetch();
          },
          onCancel: () => console.log("Deletion Cancelled"),
        });
      })
      .catch((err) => {
        Alert.fire({
          type: "error",
          title: err.message,
          text: err.code,
        });
      });
  };

  const handleRole = (id) => {
    
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-4xl">Total Users</h2>
        <h2 className="text-4xl">All Users: {users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto mt-1 w-full">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roll</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleRole(user._id)}
                      className="btn btn-ghost text-green-500 text-xl"
                    >
                      <Users />
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(user._id)}
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
    </div>
  );
};

export default AllUsers;
