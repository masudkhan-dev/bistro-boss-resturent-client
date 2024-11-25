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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const tabStyles = `
  .custom-tabs {
    font-family: 'Cinzel', serif;
  }

  .tab-list {
    display: flex;
    justify-content: center;
    gap: 2px;
    padding: 1rem;
    background: #f8f8f8;
    border-radius: 50px;
    margin: 2rem auto;
    max-width: fit-content;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .tab-item {
    padding: 12px 24px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #666;
    background: transparent;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .tab-item:hover {
    color: #D1A054;
  }

  .tab-item.active {
    background: #D1A054;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(209, 160, 84, 0.3);
  }

  .tab-item::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 100%;
    height: 100%;
    background: rgba(209, 160, 84, 0.1);
    border-radius: 25px;
    transition: transform 0.3s ease;
  }

  .tab-item:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }

  .tab-content {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  .tab-content.active {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Order = () => {
  const axiosSecure = useAxiosSecure();
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const categoryIcons = {
    salad: "🥗",
    pizza: "🍕",
    soup: "🥣",
    dessert: "🍰",
    drinks: "🥤",
  };

  useEffect(() => {
    if (category) {
      const index = categories.findIndex(
        (cat) => cat.toLowerCase() === category.toLowerCase()
      );
      if (index !== -1) {
        setActiveTab(index);
      }
    }
  }, [category]);

  const {
    data: menu = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;

  const categoryItems = categories.map((cat) =>
    menu.filter((item) => item.category === cat)
  );

  const handleTabSelect = (index) => {
    setActiveTab(index);
    navigate(`/order/${categories[index]}`);
  };

  return (
    <div className="custom-tabs">
      <style>{tabStyles}</style>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>

      <Cover
        img={o1}
        title="Order Food"
        details="Would you like to try a dish?"
      />

      <div className="container mx-auto px-4 my-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Menu Categories
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
        </div>

        <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
          <TabList className="tab-list">
            {categories.map((cat, index) => (
              <Tab
                key={cat}
                className={`tab-item ${activeTab === index ? "active" : ""}`}
              >
                <span className="mr-2">{categoryIcons[cat]}</span>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Tab>
            ))}
          </TabList>

          {categoryItems.map((items, index) => (
            <TabPanel
              key={categories[index]}
              className={`tab-content ${activeTab === index ? "active" : ""}`}
            >
              <div className="mt-8 animate-fadeIn">
                <OrderTab items={items} />
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
