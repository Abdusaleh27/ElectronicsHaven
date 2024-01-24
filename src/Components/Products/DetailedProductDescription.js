import React, { useEffect, useRef, useState } from "react";
import ProductPrice from "./ProductPrice";
import "./Styles/DetailProductDescription.css";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { API, Amplify } from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure(config);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "buttonshadow",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#3471ca",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * product details page
 */
const DetailedProductDescription = () => {
  /**
   * Hooks
   */
  const [images, setImages] = useState([]);
  const [isFavored, setIsFavored] = useState(false);
  const [product, setProduct] = useState();
  const params = useParams();
  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down(650));
  const fontBreakPoint = useMediaQuery(theme.breakpoints.down(750));

  useEffect(() => {
    fetchProduct();
    window.scroll(0, 0);
  }, []);
  const rows = useRef();
  useEffect(() => {
    fetchProduct();
  }, [isFavored]);
  useEffect(() => {
    generateTableData();
  }, [product]);

  const generateTableData = () => {
    if (product) {
      rows.current = [
        { description: "Color", detail: product.color },
        { description: "Department", detail: product.department },
        { description: "Manufacturer", detail: product.manufacturer },
        { description: "Model number", detail: product.modelNumber },
        { description: "Manufacturing date", detail: product.startDate },
        {
          description: "Shipping weight",
          detail: product.shippingWeight + " lb",
        },
        { description: "sku", detail: product.sku },
        { description: "upc", detail: product.upc },
        { description: "Warranty labor", detail: product.warrantyLabor },
        { description: "Warranty parts", detail: product.warrantyParts },
        { description: "Height", detail: product.height },
        { description: "Weight", detail: product.weight },
        { description: "Width", detail: product.width },
      ];
    }
  };
  const fetchProduct = async () => {
    const sku = params.name.split("sku")[1].trim();
    const myInit = {
      headers: {}, // OPTIONAL
      queryStringParameters: {
        searchQuery: `((search=${sku}))`,
        endQuery: "",
        trending: false,
      },
    };
    API.get("BBProductAPI", "/items", myInit)
      .then((response) => {
        setProduct((product) => response.products[0]);
        extractThumNails(response.products[0].images);
      })
      .catch((error) => console.log("could not fetch product details", error));
  };

  /**
   * Extracts the images and their thumnails for image gallery
   * @param {array} productImageList
   */
  const extractThumNails = (productImageList) => {
    let productImages = productImageList?.filter((imageObj) => {
      return (
        imageObj.width >= 400 &&
        imageObj.height >= 400 &&
        imageObj.rel.includes("Zoom")
      );
    });
    //no zoomed images
    if (!productImages.length) {
      productImages = productImageList?.filter((imageObj) => {
        return (
          imageObj.width >= 400 &&
          imageObj.height >= 400 &&
          !imageObj.rel.includes("Zoom")
        );
      });
    }
    const imageList = productImages?.map((image) => {
      return {
        original: image.href,
        thumbnail: image.href,
        originalHeight: 450,
        originalWidth: 450,
      };
    });

    imageList && setImages([...imageList]);
  };

  /**
   * manges adding the product to wish list
   * @param {Boolean} favored
   */
  const updateDetailFavorite = (favored) => {
    setIsFavored(favored);
  };
  return (
    <>
      {targetBreakPoint ? (
        <>
          <Box
            className="row mb-3"
            sx={{ marginTop: "100px", paddingRight: "5%", paddingLeft: "5%" }}
          >
            <div className="col">
              <Card>
                <CardHeader
                  color="text.secondary"
                  title={product?.name}
                  titleTypographyProps={{
                    variant: "body1",
                    fontWeight: "bold",
                  }}
                />
                <CardMedia
                  sx={{
                    paddingLeft: "25%",
                    paddingRight: "25%",
                  }}
                  className="img-fluid"
                  component="img"
                  image={product?.image}
                  alt="product"
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {product?.longDescription}
                  </Typography>
                </CardContent>
                <CardContent>
                  {product && <ProductPrice product={product} />}
                </CardContent>
                <CardActions disableSpacing>
                  {product && (
                    <ProductCard
                      product={product}
                      cardType="productdetails"
                      updateDetailFavorite={updateDetailFavorite}
                    ></ProductCard>
                  )}
                </CardActions>
              </Card>
            </div>
          </Box>
          <div className="row mt-2">
            <div className="col mt-5">
              <Box sx={{ paddingLeft: "50px", paddingRight: "50px" }}>
                {product && (
                  <ImageGallery
                    items={images}
                    showFullscreenButton={false}
                    showPlayButton={false}
                  />
                )}
              </Box>
            </div>
          </div>
        </>
      ) : (
        <>
          <Box
            className="row mt-5"
            sx={{ paddingLeft: "5%", paddingRight: "5%" }}
          >
            <div className="col-6 mt-5">
              {product && (
                <ImageGallery
                  items={images}
                  showFullscreenButton={false}
                  showPlayButton={false}
                />
              )}
            </div>

            <div className="col-6 mt-5">
              <div className="">
                <Card>
                  <CardHeader
                    title={product?.name}
                    titleTypographyProps={{
                      variant: fontBreakPoint ? "body2" : "body1",
                      fontWeight: "bold",
                    }}
                  />

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {product?.longDescription}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    {product && <ProductPrice product={product} />}
                  </CardContent>
                  <CardActions disableSpacing>
                    {product && (
                      <>
                        <ProductCard
                          product={product}
                          cardType="productdetails"
                          updateDetailFavorite={updateDetailFavorite}
                        />
                      </>
                    )}
                  </CardActions>
                </Card>
              </div>
              <div className="col-xm-1"></div>
            </div>
          </Box>
        </>
      )}

      <Box
        sx={{
          paddingLeft: targetBreakPoint ? "3%" : "15%",
          paddingRight: targetBreakPoint ? "3%" : "15%",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "25px",
            marginBottom: "100px",
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product Details</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.current?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: index % 2 === 0 ? "#3471ca" : "white",
                      fontWeight: index % 2 === 0 ? "bold" : "",
                    }}
                  >
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{
                      color: index % 2 === 0 ? "#3471ca" : "white",
                      fontWeight: index % 2 === 0 ? "bold" : "",
                    }}
                  >
                    {row.detail}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default DetailedProductDescription;
