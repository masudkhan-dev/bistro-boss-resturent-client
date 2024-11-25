import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import CallUs from "../Intro/CallUs";
import Intro from "../Intro/Intro";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommends from "../Recommends/Recommends";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>

      <Banner />
      <Category />
      <Intro />
      <PopularMenu />
      <CallUs />
      <Recommends />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
