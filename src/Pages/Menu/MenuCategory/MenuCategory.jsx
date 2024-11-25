import { Link } from "react-router-dom";
import ButtonOutline from "../../../components/Button/ButtonOutline";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, coverImg, title, btnText, details }) => {
  return (
    <div className="space-y-16 text-center mb-16">
      {title && <Cover img={coverImg} title={title} details={details} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>

      {btnText && (
        <Link to={`/order/${title.toLowerCase()}`}>
          <ButtonOutline>{btnText}</ButtonOutline>
        </Link>
      )}
    </div>
  );
};

export default MenuCategory;
