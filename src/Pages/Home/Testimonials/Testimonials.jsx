import { FaQuoteRight } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Loader from "../../../Utility/Loader/Loader";
import Error from "../../../Utility/Error/Error";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSecure.get("/review");
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <section className="my-20">
      <SectionTitle subHeading="What Our Clients Say" heading="Testimonials" />
      <div>
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            loop={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper mt-20"
          >
            {data.map((item, index) => (
              <div key={index}>
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center text-center gap-y-5 md:w-1/2 mx-auto">
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={item.rating}
                      readOnly
                    />

                    <FaQuoteRight className="text-5xl" />

                    <p className="text-base">{item.recipe}</p>
                    <h2 className="text-3xl font-bold text-[#CD9003]">
                      {item.name}
                    </h2>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
