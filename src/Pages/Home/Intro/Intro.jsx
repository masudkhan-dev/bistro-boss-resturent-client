import { motion } from "framer-motion";
import i1 from "../../../assets/home/chef-service.jpg";

const Intro = () => {
  return (
    <div className="">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${i1})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center w-fit">
          <div className="max-w-md md:max-w-5xl bg-white text-black px-10 py-10  md:py-16 rounded-lg">
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.09 }}
              className="mb-5 text-4xl md:text-5xl font-bold md:tracking-[5px] cinzel"
            >
              Bistro Boss
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="mb-5 md:leading-8 text-sm md:text-base md:tracking-[2px]"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, libero accusamus laborum deserunt ratione dolor
              officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
              nihil iusto ducimus incidunt quibusdam nemo.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
