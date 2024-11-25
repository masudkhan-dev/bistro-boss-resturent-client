import f1 from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { motion } from "framer-motion";

const Featured = () => {
  const variants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <section>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${f1})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div>
            <SectionTitle subHeading="Check it out" heading="from out menu" />

            <section className="flex flex-col md:flex-row justify-center items-center gap-10 md:mx-32 mt-5">
              <div className="md:w-1/2">
                <motion.img
                  src={f1}
                  whileHover={variants.hover}
                  whileTap={variants.tap}
                  alt="featured image"
                  className="w-96 h-full rounded-md"
                />
              </div>
              <div className="md:w-1/2 space-y-5">
                <motion.p
                  whileHover={variants.hover}
                  whileTap={variants.tap}
                  className="text-xl font-bold"
                >
                  March 20, 2023
                </motion.p>
                <motion.h2
                  whileHover={variants.hover}
                  whileTap={variants.tap}
                  className="text-4xl font-bold"
                >
                  WHERE CAN I GET SOME?
                </motion.h2>
                <motion.p whileHover={variants.hover} whileTap={variants.tap}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  voluptate facere, deserunt dolores maiores quod nobis quas
                  quasi. Eaque repellat recusandae ad laudantium tempore
                  consequatur consequuntur omnis ullam maxime tenetur.
                </motion.p>
                <button className="btn btn-outline rounded border-white text-white hover:bg-white hover:text-black/80">
                  Order Now
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
