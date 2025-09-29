import BestSeller from "./BestSeller";
import Categories from "./Categories";
import Hero from "./Hero";
import NewArrival from "./NewArrival";
import Products from "./Products";

const HomePageLayout = () => {
  return (
    <div>
      <Hero />
      <NewArrival />
      <BestSeller />
      <Categories />
      <Products />
    </div>
  );
};

export default HomePageLayout;
