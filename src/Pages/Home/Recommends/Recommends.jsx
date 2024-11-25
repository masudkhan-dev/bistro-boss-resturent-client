import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Recommend from "../../Shared/Recommend/Recommend";
import Loader from "../../../Utility/Loader/Loader";
import Error from "../../../Utility/Error/Error";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Recommends = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu");
      return res.data.filter((item) => item.category === "salad");
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <section>
      <SectionTitle subHeading="Should Try" heading="CHEF RECOMMENDS" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {data?.slice(0, 3)?.map((item) => (
          <Recommend key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Recommends;
