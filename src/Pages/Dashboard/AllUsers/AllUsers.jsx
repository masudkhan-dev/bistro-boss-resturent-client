import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../Utility/Loader/Loader";
import { Trash2 } from "lucide-react";
import Alert from "../../../Utility/Alert/Alert";
import Error from "../../../Utility/Error/Error";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch, isError, error } = useQuery({
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

  const handleDelete = (user) => {
    axiosSecure
      .delete(`/users/${user._id}`)
      .then((res) => {
        Alert.fire({
          type: "delete",
          title: "Delete Item?",
          text: `Are you sure you want to delete ${user.name}?`,
          confirmButtonText: "Yes Delete",
          cancelButtonText: "No Keep Him",
          onConfirm: () => {
            Alert.fire({
              type: "success",
              title: "Delete Successful",
              text: `${user.name} was deleted`,
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

  const handleRole = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Alert.fire({
            type: "success",
            title: `${user.name} is added to Admin`,
            text: `Now ${user.name} is admin.`,
          });
          refetch();
          console.log(user.name + " modified");
        } else {
          console.log(user.name + " can not modified");
        }
      })
      .catch((error) => {
        Alert.fire({
          type: "error",
          title: error.message,
          text: error.code,
        });
      });
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-4xl">Total Users</h2>
        <h2 className="text-4xl">All Users: {data?.length}</h2>
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
              {data.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="btn btn-ghost text-green-500 text-xl">
                        Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRole(user)}
                        className="btn btn-ghost text-green-500 text-xl"
                      >
                        User
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(user)}
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
