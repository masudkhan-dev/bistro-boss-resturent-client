import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import c1 from "../../../assets/home/slide1.jpg";
import c2 from "../../../assets/home/slide2.jpg";
import c3 from "../../../assets/home/slide3.jpg";
import c4 from "../../../assets/home/slide4.jpg";
import c5 from "../../../assets/home/slide5.jpg";

const Category = () => {
  const data = [
    { id: 1, src: c1, alt: "category 1", title: "Salad" },
    { id: 2, src: c2, alt: "category 2", title: "Shoups" },
    { id: 3, src: c3, alt: "category 3", title: "Pizzas" },
    { id: 4, src: c4, alt: "category 4", title: "desserts" },
    { id: 5, src: c5, alt: "category 5", title: "Salad" },
  ];

  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <div className="my-10 ">
      <div className="text-center mb-10">
        <motion.p
          whileHover={variants.hover}
          whileTap={variants.tap}
          className="text-[#D99904] italic mb-5 text-base w-fit mx-auto"
        >
          ---From 11:00am to 10:00pm---
        </motion.p>
        <div className=" border-y border-[#E8E8E8] w-1/4 mx-auto"></div>
        <motion.h2
          whileHover={variants.hover}
          whileTap={variants.tap}
          className="text-4xl font-bold text-black/70 my-3 w-fit mx-auto"
        >
          ORDER ONLINE
        </motion.h2>
        <div className=" border-y border-[#E8E8E8] w-1/4 mx-auto"></div>
      </div>

      <div className="ml-[10%] md:ml-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper "
        >
          {data.map((item) => (
            <div key={item.id}>
              <SwiperSlide className="">
                <motion.img
                  src={item.src}
                  alt={item.alt}
                  whileHover={variants.hover}
                  whileTap={variants.tap}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg"
                />
                <h3 className="text-2xl font-bold translate-x-20 -translate-y-16 z-20 absolute text-white  uppercase">
                  {item.title}
                </h3>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
