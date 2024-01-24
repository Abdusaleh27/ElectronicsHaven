import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import heroIMTP1 from "../../banners/heroIMGTP1.png";
import heroIMTP2 from "../../banners/heroIMGTP2.png";
import heroIMTP3 from "../../banners/heroIMGTP3.png";
import heroIMTP4 from "../../banners/heroIMGTP4.png";
import { Link } from "react-router-dom";

/**
 * Swiper for the featured products on the hero section
 *
 */
const HeroSwiper = () => {
  const responsive = {
    tablet: {
      breakpoint: { max: 4000, min: 470 },
      items: 3,
    },
    mobile: {
      breakpoint: {
        max: 470,
        min: 0,
      },
      items: 2,
    },
  };
  return (
    <div className="row mx-3 mt-3">
      <Carousel responsive={responsive}>
        <Box maxWidth={"120px"} className={`herobanner-image`} padding={"10px"}>
          <Link to="productdetails/sku6560070">
            <img src={heroIMTP1} className="img-fluid" alt="hero1"></img>
          </Link>
        </Box>

        <Box maxWidth={"100px"} className={`herobanner-image`} padding={"15px"}>
          <Link to="productdetails/sku6543821">
            <img src={heroIMTP3} className="img-fluid" alt="hero2"></img>
          </Link>
        </Box>

        <Box maxWidth={"150px"} className={`herobanner-image`} padding={"15px"}>
          <Link to="productdetails/sku6512838">
            <img src={heroIMTP2} className="img-fluid" alt="hero2"></img>
          </Link>
        </Box>

        <Box
          maxWidth={"190px"}
          className={`herobanner-image`}
          padding={"12px"}
          marginTop={"15px"}
        >
          <Link to="productdetails/sku6536964">
            <img src={heroIMTP4} className="img-fluid" alt="hero2"></img>
          </Link>
        </Box>
      </Carousel>
    </div>
  );
};

export default HeroSwiper;
