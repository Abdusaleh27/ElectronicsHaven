import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "./Styles/TrendingProducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Pagination } from "swiper/modules";
import { Navigation, A11y } from "swiper/modules";
import ProductCard from "../Products/ProductCard";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { API, Amplify } from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure(config);

/**
 * Create a swiper for trending and most view products typically 10 items
 * rendered on landing page
 * @param {object} props
 *
 */
const TrendingSwiper = ({ trendType = "mostViewed", description }) => {
  const [data, setData] = useState(null);
  const theme = useTheme();
  const smallBreakPoint = useMediaQuery(theme.breakpoints.down("sm"));
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down("md"));
  const lgBreakPoint = useMediaQuery(theme.breakpoints.up("1575"));
  const [favored, setFavored] = useState(false);
  const [retry, setRetry] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (retry) {
      fetchData();
      setRetry(false);
    }
  }, [retry]);

  /**
   * Querying api for trending products
   */
  const fetchData = async () => {
    const myInit = {
      headers: {}, // OPTIONAL
      queryStringParameters: {
        searchQuery: trendType,
        endQuery: "",
        trending: true,
      },
    };
    API.get("BBProductAPI", "/items", myInit)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setRetry(true);
        console.log("could not fetch trending swiper products", error);
      });
  };
  const updateFavored = (isFavored) => {
    setFavored(isFavored);
  };

  return (
    <>
      <Box margin={targetBreakPoint ? "50px -4%" : "50px 0"}>
        <Container maxWidth="50 vw">
          <Paper
            square
            elevation={0}
            sx={{
              backgroundColor: "ButtonShadow",
              p: 1,
              margin: `0 ${lgBreakPoint ? "2.4vw" : ""}`,
              padding: "40px 10px",
            }}
          >
            <h4 className="trending-header mb-4 mt-2">{description}</h4>

            <Swiper
              spaceBetween={10}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Pagination, A11y]}
              breakpoints={{
                0: {
                  width: 350,
                  slidesPerView: 2,
                },
                500: {
                  width: 500,
                  slidesPerView: 2,
                },
                768: {
                  width: 768,
                  slidesPerView: 2,
                },
              }}
            >
              <div className="swiper-button-prev">
                <ArrowBackIosOutlinedIcon />
              </div>
              <div className="swiper-button-next">
                <ArrowForwardIosOutlinedIcon />
              </div>
              <Grid container spacing={1}>
                {data &&
                  data.results.map((product, index) => (
                    <SwiperSlide key={index}>
                      <Paper
                        elevation={4}
                        square={false}
                        sx={{ marginLeft: "5px", p: 1, height: 400, mb: 1 }}
                      >
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            height: "100%",
                          }}
                        >
                          <Grid item>
                            {product && (
                              <>
                                <Link
                                  to={`/productdetails/${(
                                    product.names.title +
                                    "sku" +
                                    product.sku
                                  )
                                    .split("/")
                                    .join()}`}
                                >
                                  <img
                                    src={
                                      product.images.standard +
                                      ";maxHeight=130;maxWidth=230"
                                    }
                                    alt="product"
                                    className="img-fluid"
                                  />
                                  <p></p>
                                  <p
                                    className={`product-name ${
                                      smallBreakPoint
                                        ? "trending-product-name"
                                        : ""
                                    }`}
                                  >
                                    {product.names.title}
                                  </p>
                                </Link>

                                {product.prices.current <
                                product.prices.regular ? (
                                  <>
                                    <Typography
                                      variant="body2"
                                      className="fw-bold price"
                                    >
                                      <span className="striked-price">
                                        ${product.prices.regular}
                                      </span>{" "}
                                      <span>${product.prices.current} </span>
                                    </Typography>
                                  </>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    className="fw-bold price"
                                  >
                                    <span>${product.prices.current}</span>
                                  </Typography>
                                )}

                                <Rating
                                  initialValue={
                                    product.customerReviews.averageScore
                                  }
                                  size={targetBreakPoint ? 15 : 20}
                                  allowFraction
                                  allowHover={false}
                                  readonly={true}
                                />
                                <span className="review-count">
                                  {" "}
                                  ({product.customerReviews.count})
                                </span>
                              </>
                            )}
                          </Grid>

                          <ProductCard
                            product={{
                              sku: parseInt(product.sku),
                              name: product.names.title,
                              image: product.images.standard,
                              description: product.descriptions.short,
                              salePrice: product.prices.current,
                              customerReviewAverage:
                                product.customerReviews.averageScore,
                              regularPrice: product.prices.regular,
                              customerReviewCount:
                                product.customerReviews.count,
                              quantityLimit: 3,
                            }}
                            cardType="productdetails"
                            updateDetailFavorite={updateFavored}
                          />
                        </Grid>
                      </Paper>
                    </SwiperSlide>
                  ))}
              </Grid>
            </Swiper>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default TrendingSwiper;
