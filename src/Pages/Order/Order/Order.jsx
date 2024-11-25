import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cover from "../../Shared/Cover/Cover";
import Loader from "../../../Utility/Loader/Loader";
import Error from "../../../Utility/Error/Error";
import OrderTab from "../OrderTab/OrderTab";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import o1 from "../../../assets/order/order.jpg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Order = () => {
  const axiosSecure = useAxiosSecure();
  const params = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

  console.log(params);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu"],
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

  const salad = data.filter((item) => item.category === "salad");
  const pizza = data.filter((item) => item.category === "pizza");
  const soup = data.filter((item) => item.category === "soup");
  const dessert = data.filter((item) => item.category === "dessert");
  const drinks = data.filter((item) => item.category === "drinks");

  const handleTabSelect = (i) => {
    setTabIndex(i);
    navigate(`/order/${categories[i]}`);
  };

  return (
    <div>
      <Helmet>
        <title> Bistro Boss | Order Food </title>
      </Helmet>

      <Cover
        img={o1}
        title="Order Food"
        details="Would you like to try a dish?"
      />

      <div className="text-center my-10">
        <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          <TabPanel>
            <OrderTab items={salad} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={pizza} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={soup} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={dessert} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
