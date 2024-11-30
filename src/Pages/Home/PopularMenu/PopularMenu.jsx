import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Loader from "../../../Utility/Loader/Loader";
import ButtonOutline from "../../../components/Button/ButtonOutline";
import Error from "../../../Utility/Error/Error";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularMenu = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu");
      const popularItems = res.data.filter(
        (item) => item.category === "popular"
      );
      return popularItems;
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
      <div className="my-16">
        <SectionTitle subHeading="Popular Items" heading="FROM OUR MENU" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data?.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-center items-center my-8">
        <ButtonOutline>View Full Menu</ButtonOutline>
      </div>
    </section>
  );
};

export default PopularMenu;
