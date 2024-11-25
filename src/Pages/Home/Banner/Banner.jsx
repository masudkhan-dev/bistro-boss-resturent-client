import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import b1 from "../../../assets/home/01.jpg";
import b2 from "../../../assets/home/02.jpg";
import b3 from "../../../assets/home/03.png";
import b4 from "../../../assets/home/04.jpg";
import b5 from "../../../assets/home/05.png";
import b6 from "../../../assets/home/06.png";

const Banner = () => {
  const data = [
    { id: 1, src: b1, alt: "banner " },
    { id: 2, src: b2, alt: "banner " },
    { id: 3, src: b3, alt: "banner " },
    { id: 4, src: b4, alt: "banner " },
    { id: 5, src: b5, alt: "banner " },
    { id: 6, src: b6, alt: "banner " },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper mt-20"
    >
      {data.map((item, index) => (
        <div key={index}>
          <SwiperSlide>
            <motion.img
              src={item.src}
              alt={item.alt}
              className="rounded"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
};

export default Banner;
