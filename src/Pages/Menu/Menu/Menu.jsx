import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import Error from "../../../Utility/Error/Error";
import Loader from "../../../Utility/Loader/Loader";
import MenuCategory from "../MenuCategory/MenuCategory";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";

import m1 from "../../../assets/menu/banner3.jpg";
import m2 from "../../../assets/menu/dessert-bg.jpeg";
import m3 from "../../../assets/menu/pizza-bg.jpg";
import m4 from "../../../assets/menu/salad-bg.jpg";
import m5 from "../../../assets/menu/soup-bg.jpg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Menu = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menua"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const offered = data.filter((item) => item.category === "offered");
  const desserts = data.filter((item) => item.category === "dessert");
  const pizzas = data.filter((item) => item.category === "pizza");
  const salads = data.filter((item) => item.category === "salad");
  const soups = data.filter((item) => item.category === "soup");

  return (
    <div className="mt-10">
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>

      {/* main cover */}
      <Cover
        img={m1}
        title="OUR MENU"
        details="Would you like to try a dish?"
      />

      {/* offered */}
      <div>
        <div className="my-16">
          <SectionTitle subHeading="Don't miss" heading="Today's Offer" />
        </div>
        <MenuCategory items={offered} coverImg={m1} />
      </div>

      {/* desserts items*/}
      <div>
        <MenuCategory
          items={desserts}
          coverImg={m2}
          title="desserts"
          details="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btnText="Order Your Favorite Dessert"
        />
      </div>

      {/* pizzas items*/}
      <div>
        <MenuCategory
          items={pizzas}
          coverImg={m3}
          title="pizzas"
          details="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btnText="Order Your Favorite Pizza"
        />
      </div>

      {/* salads items*/}
      <div>
        <MenuCategory
          items={salads}
          coverImg={m4}
          title="salads"
          details="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btnText="Order Your Favorite Salad"
        />
      </div>
      {/* soups items*/}
      <div>
        <MenuCategory
          items={soups}
          coverImg={m5}
          title="soups"
          details="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btnText="Order Your Favorite Soup"
        />
      </div>
    </div>
  );
};

export default Menu;
