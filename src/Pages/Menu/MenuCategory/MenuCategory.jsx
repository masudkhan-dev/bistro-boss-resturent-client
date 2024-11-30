import { Link } from "react-router-dom";
import ButtonOutline from "../../../components/Button/ButtonOutline";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, coverImg, title, btnText, details }) => {
  const getCategorySlug = (title) => {
    if (!title) return "";
    // Handle special cases and ensure consistent category names
    const categoryMap = {
      "offered": "salad", // default to salad if it's the offered section
      "desserts": "dessert",
      "drinks": "drinks",
      "salads": "salad",
      "pizzas": "pizza",
      "soups": "soup"
    };

    const normalizedTitle = title.toLowerCase().trim();
    return categoryMap[normalizedTitle] || 
           categoryMap[normalizedTitle + 's'] || 
           normalizedTitle;
  };

  return (
    <div className="space-y-16 text-center mb-16">
      {title && <Cover img={coverImg} title={title} details={details} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {items.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>

      {btnText && (
        <Link to={`/order/${getCategorySlug(title)}`}>
          <ButtonOutline>{btnText}</ButtonOutline>
        </Link>
      )}
    </div>
  );
};

export default MenuCategory;