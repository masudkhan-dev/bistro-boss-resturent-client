import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import b1 from "../../../assets/home/01.jpg";
import b2 from "../../../assets/home/02.jpg";
import b3 from "../../../assets/home/03.png";
import b4 from "../../../assets/home/04.jpg";
import b5 from "../../../assets/home/05.png";
import b6 from "../../../assets/home/06.png";

const Banner = () => {
  const data = [
    { id: 1, src: b1, alt: "banner 1" },
    { id: 2, src: b2, alt: "banner 2" },
    { id: 3, src: b3, alt: "banner 3" },
    { id: 4, src: b4, alt: "banner 4" },
    { id: 5, src: b5, alt: "banner 5" },
    { id: 6, src: b6, alt: "banner 6" },
  ];

  return (
    <Carousel autoPlay infiniteLoop className="mt-16">
      {data.map((item) => (
          <div key={item.id}>
          <motion.img
            src={item.src}
            alt={item.alt}
            className="rounded"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
