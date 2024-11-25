import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {currentItems.map((item) => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>

      <div className="join mt-8 flex items-center justify-center">
        {[...Array(totalPages)].map((_, index) => (
          <input
            key={index}
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label={index + 1}
            checked={currentPage === index + 1}
            onChange={() => handlePagination(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderTab;
