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
import { API, Amplify } from "aws-amplify";
import config from "../../aws-exports";
import { v4 as UUID } from "uuid";
Amplify.configure(config);

/**
 * Renders two trending and most viewed products typically
 * 20 products per section
 * @param {Object} props
 *
 */
const TrendingTable = ({
  title,
  catId1,
  catId2,
  bgColor,
  styleClass,
  square = true,
  elevation = 0,
  shadow = "",
}) => {
  /**
   * States
   */
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data, setData] = useState([]);
  const [retry, setRetry] = useState(false);
  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down("md"));
  const lgBreakPoint = useMediaQuery(theme.breakpoints.up("1575"));

  /**
   * Fetches data from backend based on the top viewed or trending products
   * based on the category.
   * @param {String} catID (category id)
   * @param {int} order (1 for first set of products and any for the second set)
   * @returns
   */
  const fetchData = async (catID, order) => {
    let currentData = [];
    const myInit = {
      headers: {}, // OPTIONAL
      queryStringParameters: {
        searchQuery: `mostViewed(categoryId=${catID})`,
        endQuery: "",
        trending: true,
      },
    };
    API.get("BBProductAPI", "/items", myInit)
      .then((response) => {
        if (order === 1) {
          setData1(() => [...response.results]);
        } else {
          setData2(() => [...response.results]);
        }
      })
      .catch((error) => {
        setRetry(() => true);
        console.log("could not fetch products", error);
      });
    return currentData;
  };

  /**
   * Effects
   */
  useEffect(() => {
    fetchData(catId1, 1);
  }, [catId1]);
  useEffect(() => {
    fetchData(catId2, 2);
  }, [catId2]);
  useEffect(() => {
    setData(() => [...data1, ...data2]); //combines both lists of products
  }, [data1, data2, title]);
  useEffect(() => {
    if (retry) {
      fetchData(catId1, 1);
      fetchData(catId2, 2);
      setRetry(false);
    }
  }, [retry]);
  return (
    <Box margin={targetBreakPoint ? "50px -4%" : "50px 0"}>
      <Container maxWidth="50 vw">
        <Paper
          square={square}
          elevation={elevation}
          sx={{
            backgroundColor: bgColor,
            backgroundImage: bgColor,
            p: 1,
            margin: `0 ${lgBreakPoint ? "2.4vw" : ""}`,
            padding: "40px 20px",
          }}
        >
          <Typography
            variant="h6"
            color={"white"}
            marginTop={3}
            marginBottom={5}
          >
            {title}
          </Typography>
          <Grid container spacing={2} direction="row">
            {data.length > 0 &&
              data.map((product, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={UUID()}>
                  <div className={styleClass + shadow}>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        height: "100%",
                      }}
                    >
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 1,
                          textOverflow: "clip",
                        }}
                      >
                        {product && (
                          <Link
                            to={`/productdetails/${(
                              product.names?.title +
                              "sku" +
                              product.sku
                            )
                              .split("/")
                              .join()}`}
                          >
                            <img
                              src={
                                product.images?.standard +
                                ";maxHeight=350;maxWidth=200"
                              }
                              alt="product"
                              className="img-fluid"
                            />
                            <div className="trending-product-name">
                            <p></p>
                              <p className="product-name trending-product-name">
                                {product.names?.title}
                              </p>
                            </div>
                          </Link>
                        )}
                      </Grid>
                      <Grid item>
                        {product.prices?.current < product.prices?.regular ? (
                          <>
                            <Typography
                              variant="body2"
                              className="fw-bold price"
                              mb={2}
                            >
                              <span className="striked-price">
                                ${product.prices?.regular}
                              </span>{" "}
                              <span>${product.prices?.current}</span>
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant="body2"
                            className="fw-bold price"
                            mb={2}
                          >
                            ${product.prices?.current}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default TrendingTable;
