import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../Utility/Loader/Loader";
import Error from "../../../Utility/Error/Error";
import { DollarSign, Menu, Truck, User } from "lucide-react";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  console.log(data);

  return (
    <div>
      <h2>{user?.displayName ? user.displayName : "back"}</h2>

      <div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <DollarSign />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${data.revenue.toFixed(2)} </div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <User />
            </div>
            <div className="stat-title"> Users</div>
            <div className="stat-value"> {data.users} </div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <Menu />
            </div>
            <div className="stat-title">Menu Item</div>
            <div className="stat-value"> {data.menuItem} </div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <Truck />
            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value"> {data.orders} </div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
