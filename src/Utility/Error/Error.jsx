import { IoIosCloseCircle } from "react-icons/io";

const Error = ({ error }) => {
  return (
    <div className="flex justify-center items-center my-16 shadow-xl">
      <div role="alert" className="alert alert-error">
        <IoIosCloseCircle />
        <span>{error?.message}</span>
      </div>
    </div>
  );
};

export default Error;
