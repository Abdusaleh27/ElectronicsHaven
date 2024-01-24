import BannerSlider from "./BannerSlider";
import TrendingSwiper from "../TrendingProducts/TrendingSwiper";
import UnderHeroSection from "./UnderHeroSection";
import TrendingTable from "../TrendingProducts/TrendingTable";
import { useEffect, useState } from "react";
const categories = [
  ["Phones & Tablets", ["pcmcat209400050001", "pcmcat209000050006"]],
  ["Headphones & Speakers", ["abcat0204000", "pcmcat310200050004"]],
  ["Home Audio & TVs", ["pcmcat241600050001", "abcat0101000"]],
  ["Desktops & Laptops", ["abcat0501000", "abcat0502000"]],
  ["Fridges & Ovens", ["abcat0901000", "abcat0904000"]],
  ["Kitchen Appliances & Washers", ["abcat0912000", "abcat0910000"]],
  ["Camera & Home Security", ["abcat0401000", "pcmcat254000050002"]],
];

/**
 * Renders all the landing page components
 */
const MainPage = () => {
  /**
   * Hooks
   */
  const [catOne, setCatOne] = useState(null);
  const [catTwo, setCatTwo] = useState(null);

  /**
   * Effects
   */
  useEffect(() => {
    /** randomizes categories */
    const randomizeCategories = () => {
      const cat1 = Math.floor(Math.random() * categories.length);
      let cat2 = Math.floor(Math.random() * categories.length);
      while (cat1 === cat2) {
        cat2 = Math.floor(Math.random() * categories.length);
      }
      setCatOne(cat1);
      setCatTwo(cat2);
    };
    randomizeCategories();
  }, []);
  return (
    <div>
      <div className="row mt-1"></div>
      <BannerSlider />
      <UnderHeroSection />
      <TrendingSwiper description="Most popular items" />
      {catOne !== null && (
        <TrendingTable
          title={categories[catOne][0]}
          catId1={categories[catOne][1][0]}
          catId2={categories[catOne][1][1]}
          bgColor={
            "radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%)"
          }
          styleClass={"small-product-card1"}
        />
      )}
      <TrendingSwiper
        trendType="trendingViewed"
        description="Trending products"
      />
      {catTwo !== null && (
        <TrendingTable
          title={categories[catTwo][0]}
          catId1={categories[catTwo][1][0]}
          catId2={categories[catTwo][1][1]}
          bgColor={
            "radial-gradient(circle at 3% 7.4%, rgb(0, 144, 243) 0%, rgb(0, 86, 240) 90%)"
          }
          styleClass={"small-product-card2"}
          square={false}
          elevation={10}
          shadow=" shadow"
        />
      )}
    </div>
  );
};

export default MainPage;
