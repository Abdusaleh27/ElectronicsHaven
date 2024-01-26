import React, { useEffect, useState } from "react";
import heroBG3 from "../../banners/heroBG3.jpg";
import heroIMTP1 from "../../banners/heroIMGTP1.png";
import heroIMTP2 from "../../banners/heroIMGTP2.png";
import heroIMTP3 from "../../banners/heroIMGTP3.png";
import heroIMTP4 from "../../banners/heroIMGTP4.png";
import "./Styles/BannerSlider.css";
import {
  Box,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HeroSwiper from "./HeroSwiper";
import { Link } from "react-router-dom";

/**
 * Displays the images on the hero section
 * Images are displayed with shiny effect in desktop mode or
 * as a slider in mobile mode
 */
const BannerSlider = () => {
  /**
   * Hooks
   */
  const theme = useTheme();
  const mobileBreakPoint = useMediaQuery(theme.breakpoints.down("470"));
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down("750"));
  const lgBreakPoint = useMediaQuery(theme.breakpoints.down("900"));
  const xlBreakPoint = useMediaQuery(theme.breakpoints.down("1575"));
  const xxlBreakPoint = useMediaQuery(theme.breakpoints.up("1575"));
  const [shiny, setShiny] = useState(true);
  const [shiny2, setShiny2] = useState(true);

  /**
   * Manages the shiny effect on images in desktop mode.
   * The reason for having two effects is setup different
   * intervals for showing the shiny effect on images
   */
  useEffect(() => {
    if (!targetBreakPoint) {
      const interval = setInterval(function () {
        setShiny(true);
        setTimeout(function () {
          setShiny(false);
        }, 2000);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [shiny, targetBreakPoint]);
  useEffect(() => {
    if (!targetBreakPoint) {
      const interval = setInterval(function () {
        setShiny2(true);
        setTimeout(function () {
          setShiny2(false);
        }, 2500);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [shiny2, targetBreakPoint]);

  return (
    <>
      <Box
        sx={{
          paddingBottom: targetBreakPoint ? "10px" : "20px",
          marginTop:
            (targetBreakPoint && "-80px") ||
            
            (xxlBreakPoint && "21px"),
          width: "100%",
          backgroundImage: `url(${heroBG3})`,
          backgroundSize: "100% 100%",
        }}
      >
        <Grid container>
          <Grid
            item
            md={6}
            padding={
              (mobileBreakPoint && "0 5%") ||
              (targetBreakPoint && "0 15%") ||
              (lgBreakPoint && " 0 5%") ||
              (xlBreakPoint && " 0 10%") ||
              (xxlBreakPoint && " 0 15%")
            }
          >
            <Box
              maxWidth={
                (targetBreakPoint && "100%") ||
                (lgBreakPoint && "300px") ||
                (xlBreakPoint && "400px") ||
                (xxlBreakPoint && "600px")
              }
              mt={20}
            >
              <Typography
                variant={lgBreakPoint ? "h6" : "h5"}
                color="#ff4d02"
                textAlign={"left"}
                marginBottom={"15px"}
                fontSize={
                  (mobileBreakPoint && "20px") ||
                  (targetBreakPoint && "22px") ||
                  (lgBreakPoint && "21px") ||
                  (xlBreakPoint && " 24px") ||
                  (xxlBreakPoint && "25px")
                }
              >
                Check out our Huge Collection
              </Typography>
              <Typography
                variant="body2"
                color={"white"}
                textAlign={"left"}
                marginBottom={targetBreakPoint ? "" : "40px"}
                fontSize={targetBreakPoint ? 13 : 17}
              >
                Discover the latest and greatest electronics from smartphones to
                laptops, we have everything you need to stay connected and
                entertained.
              </Typography>
              <Typography
                variant="body2"
                color={"#f38842"}
                textAlign={"left"}
                marginBottom={targetBreakPoint ? "" : "18px"}
                fontSize={targetBreakPoint ? 15 : 19}
                mt={1}
              >
                By Abdullah Saleh
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            mt={targetBreakPoint ? 5 : 10}
            padding={targetBreakPoint && "0 25%"}
            marginTop={(targetBreakPoint && "25px") || "80px"}
          >
            <Chip
              label="Featured products"
              size="large"
              color="error"
              sx={{
                marginRight: xxlBreakPoint && "28%",
                marginLeft:
                  (mobileBreakPoint && "15%") || (targetBreakPoint && "35%"),
              }}
            ></Chip>
            {!targetBreakPoint ? (
              <>
                <div className="row mt-3">
                  <div
                    className={`${
                      xxlBreakPoint
                        ? "justify-content-left "
                        : " justify-content-center"
                    } d-flex col-6`}
                  >
                    <Box
                      maxWidth={(xlBreakPoint && "110px") || "180px"}
                      className={`herobanner-image ${shiny ? "wrap" : ""}`}
                      padding={"10px"}
                      marginBottom={"25px"}
                    >
                      <Link to="productdetails/sku6560070">
                        <img
                          src={heroIMTP1}
                          className="img-fluid"
                          alt="hero1"
                        ></img>
                      </Link>
                    </Box>
                  </div>
                  <div
                    className={`${
                      xxlBreakPoint
                        ? "justify-content-left "
                        : " justify-content-center"
                    } d-flex col-6`}
                  >
                    <Box
                      maxWidth={(xlBreakPoint && "100px") || "150px"}
                      className={`herobanner-image ${shiny2 ? "wrap" : ""}`}
                      padding={"15px"}
                    >
                      <Link to="productdetails/sku6543821">
                        <img
                          src={heroIMTP3}
                          className="img-fluid"
                          alt="hero2"
                        ></img>
                      </Link>
                    </Box>
                  </div>
                </div>
                <div className="row ">
                  <div
                    className={`${
                      xxlBreakPoint
                        ? "justify-content-left "
                        : " justify-content-center"
                    } d-flex col-6`}
                  >
                    <Box
                      maxWidth={(xlBreakPoint && "140px") || "190px"}
                      className={`herobanner-image ${shiny2 ? "wrap" : ""}`}
                      padding={"15px"}
                    >
                      <Link to="productdetails/sku6512838">
                        <img
                          src={heroIMTP2}
                          className="img-fluid"
                          alt="hero2"
                        ></img>
                      </Link>
                    </Box>
                  </div>
                  <div
                    className={`${
                      xxlBreakPoint
                        ? "justify-content-left "
                        : " justify-content-center"
                    } d-flex col-6`}
                  >
                    <Box
                      maxWidth={(xlBreakPoint && "165px") || "270px"}
                      className={`herobanner-image ${shiny ? "wrap" : ""}`}
                      padding={"10px"}
                      paddingTop={"25px"}
                    >
                      <Link to="productdetails/sku6536964">
                        <img
                          src={heroIMTP4}
                          className="img-fluid"
                          alt="hero2"
                        ></img>
                      </Link>
                    </Box>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        {targetBreakPoint && <HeroSwiper></HeroSwiper>}
      </Box>
    </>
  );
};

export default BannerSlider;
