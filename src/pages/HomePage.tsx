import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../components/Hero";
import FeaturedStocks from "../components/FeaturedStocks";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedStocks />
    </div>
  );
};

export default HomePage;
