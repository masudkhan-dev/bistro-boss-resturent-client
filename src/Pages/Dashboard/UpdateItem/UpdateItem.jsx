import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Alert from "../../../Utility/Alert/Alert";
import { Upload, Info } from "lucide-react";


const img_hosting_key = import.meta.env.VITE_IMG_API_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;


const UpdateItem = () => {
  const {_id,name, category, recipe, image, price} = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log(name, category, recipe, image, price);

  const onSubmit = async (data) => {
    console.log(data);
    const imgFile = { image: data.image[0] };

    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        recipe: data.recipe,
        price: parseFloat(data.price),
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log("with img url ", res.data.data.display_url);

      if (menuRes.data.modifiedCount > 0) {
        Alert.fire({
          type: "success",
          title: "Menu item was Updated successfully",
          text: `${data.name} is updated`,
        });
      //  reset()
      }
    }

    console.log(res.data);
  };

  return (
    <div>
      <div>
        <SectionTitle heading="Update Item" subHeading="lets update" />
      </div>
      <div>
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="p-8 bg-gray-50 border-b border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Item Name
                  <Info
                    size={16}
                    className="ml-2 text-blue-500 cursor-tooltip"
                    title="Enter the name of the menu item"
                  />
                </label>
                <input
                defaultValue={name}
                  id="name"
                  type="text"
                  placeholder="e.g., Margherita Pizza"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                    errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                  {...register("name", {
                    required: "Item name is required",
                    maxLength: {
                      value: 80,
                      message: "Name cannot exceed 80 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Category & Price Row */}
              <div className="grid grid-cols-2 gap-6">
                {/* Category Select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                  defaultValue={category}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D1A054] transition-all duration-300 outline-none"
                    {...register("category", {
                      required: "Category selection is required",
                    })}
                  >
                    <option value="default">Select Category</option>
                    <option value="popular">Popular</option>
                    <option value="dessert">Dessert</option>
                    <option value="soup">Soup</option>
                    <option value="salad">Salad</option>
                    <option value="pizza">Pizza</option>
                    <option value="drinks">Drinks</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <span className="mr-1">⚠️</span> {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Price Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                  defaultValue={price}
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                      errors.price
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0,
                        message: "Price must be a positive number",
                      },
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <span className="mr-1">⚠️</span> {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Recipe Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipe
                </label>
                <textarea
                defaultValue={recipe}
                  placeholder="Describe the item's ingredients, preparation, and special features..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  {...register("recipe", {
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters",
                    },
                  })}
                />
                {errors.recipe && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.recipe.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Item Image
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                    <Upload size={20} className="mr-2" />
                    Choose Image
                    <input type="file" {...register("image")} />
                  </label>
                </div>
              </div>

              {/* Submit Button */}

              <input
                type="submit"
                value="Add Item"
                className="w-full bg-[#D1A054] text-white py-3 rounded  transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl "
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
