import React, { useEffect, useState } from "react";
import heroBG3 from "../../banners/heroBG3.jpg";
import heroIMTP1 from "../../banners/heroIMGTP1_SM.png";
import heroIMTP2 from "../../banners/heroIMGTP2_SM.png";
import heroIMTP3 from "../../banners/heroIMGTP3_SM.png";
import heroIMTP4 from "../../banners/heroIMGTP4_SM.png";
import "./Styles/BannerSlider.css";
import {
  Box,
  Chip,
  Grid,
  Paper,
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
  const customLarge = useMediaQuery(theme.breakpoints.down("lg"));
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
          marginTop: (lgBreakPoint && "-60px") || (xxlBreakPoint && "21px"),
          width: "100%",
          backgroundImage: `url(${heroBG3})`,
          backgroundSize: "100% 100%",
        }}
      >
        <Grid container>
          <Grid
            item
            md={6}
            xs={12}
            padding={
              (mobileBreakPoint && "0 0%") ||
              // (targetBreakPoint && "0 15%") ||
              (customLarge && " 0 3%") ||
              (xlBreakPoint && " 0 3%") ||
              (xxlBreakPoint && " 0 3%")
            }
            my={"auto"}
          >
            <Box
              maxWidth={
                (mobileBreakPoint && "360px") ||
                (targetBreakPoint && "413px") ||
                (lgBreakPoint && "495px") ||
                (customLarge && "450px") ||
                (xlBreakPoint && "700px") ||
                (xxlBreakPoint && "700px")
              }
              margin={lgBreakPoint && "auto"}
              mt={ customLarge ? 20 : 15}
            >
                <Typography
                  color="#ffdd01"
                  textAlign={lgBreakPoint ? "center" : "left"}
                  marginBottom={"15px"}
                  fontSize={
                    (mobileBreakPoint && "25.5px") ||
                    (targetBreakPoint && "29px") ||
                    (lgBreakPoint && "34px") ||
                    (customLarge && "27.6px") ||
                    (xlBreakPoint && " 37px") ||
                    (xxlBreakPoint && "47.8px")
                  }
                  
                >
                  Check Out Our Huge Collection
                </Typography>
              <Typography
                variant="body2"
                color={"white"}
                textAlign={mobileBreakPoint ? "center" : "left"}
                marginBottom={lgBreakPoint ? "20px" : "25px"}
                fontSize={targetBreakPoint ? 15.5 : 20}
              >
                Discover the latest and greatest electronics from smartphones to
                laptops, we have everything you need to stay connected and
                entertained.
              </Typography>

              <Typography
                variant="body2"
                color={"#ffdd01"}
                textAlign={lgBreakPoint ? "center" : "left"}
                marginBottom={lgBreakPoint ? "" : "18px"}
                fontSize={targetBreakPoint ? 17 : 19}
                mt={1}
              >
                By Abdullah Saleh
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            mt={lgBreakPoint ? 5 : 10}
            marginTop={(lgBreakPoint && "25px") || "80px"}
          >
            <Chip
              label="Featured products"
              size="large"
              color="error"
              sx={{
                marginRight: xxlBreakPoint && "28%",
              }}
            ></Chip>
            {!lgBreakPoint ? (
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
                      <Link to="productdetails/sku6560081">
                        <img
                          src={heroIMTP1}
                          className="img-fluid"
                          alt="applewatch"
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
                      <Link to="productdetails/sku6562707">
                        <img
                          src={heroIMTP3}
                          className="img-fluid"
                          alt="steelseries"
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
                      <Link to="productdetails/sku6586745">
                        <img
                          src={heroIMTP2}
                          className="img-fluid"
                          alt="galaxyfold"
                        ></img>
                      </Link>
                    </Box>
                  </div>
                  <div
                    className={`${
                      xxlBreakPoint
                        ? "justify-content-left  tv"
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
                          alt="tv"
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
        {lgBreakPoint && <HeroSwiper></HeroSwiper>}
      </Box>
    </>
  );
};

export default BannerSlider;
