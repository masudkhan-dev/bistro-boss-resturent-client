import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../Utility/Loader/Loader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment history", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Total Payments: {data.length} </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment, index) => (
              <tr key={index}>
                <th> {index + 1} </th>
                <td>{payment.price} </td>
                <td> {payment.transactionId} </td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
