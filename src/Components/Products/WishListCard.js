import { Favorite, ShoppingCartRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Fragment } from "react";

import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const WishListCard = ({
  product,
  wishListclicked,
  shoppingCartClicked,
  isOverLimit,
}) => {
  const handleWishList = () => {
    wishListclicked();
  };
  const handleShoppingCart = (e) => {
    shoppingCartClicked(e);
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper
          elevation={5}
          square={false}
          sx={{ p: 1, height: "100%", border: "solid 1px #3471ca",paddingBottom:"25px" }}
          
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
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            >
              {product && (
                <Link
                  to={`/productdetails/${(product.name + "sku" + product.sku)
                    .split("/")
                    .join()}`}
                >
                  <img
                    src={product.image + ";maxHeight=130;maxWidth=230"}
                    alt="product"
                    className="img-fluid"
                  />
                  <p></p>
                  <p className="product-name">{product.name}</p>
                </Link>
              )}
            </Grid>
            <Grid item>
              {product.salePrice < product.regularPrice ? (
                <>
                  <Typography
                    variant="body2"
                    className="fw-bold"
                    sx={{ mb: "15px" }}
                  >
                    <span className="striked-price">
                      ${product.regularPrice}
                    </span>{" "}
                    <span>${product.salePrice}</span>
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="body2"
                  className="fw-bold"
                  sx={{ mb: "15px" }}
                >
                  ${product.salePrice}
                </Typography>
              )}
              <Rating
                initialValue={product.customerReviewAverage}
                size={20}
                allowFraction
                allowHover={false}
                readonly={true}
              />
              <span className="review-count">
                ({product.customerReviewCount})
              </span>
            </Grid>

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <Button
                variant="contained"
                startIcon={<ShoppingCartRounded />}
                onClick={handleShoppingCart}
                size="small"
                disabled={isOverLimit}
              >
                {isOverLimit ? "Max in cart" : "Add Item"}
              </Button>
              <IconButton
                sx={{ marginLeft: 2, textSizeAdjust: 5 }}
                onClick={handleWishList}
              >
                <Favorite color="primary"></Favorite>
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default WishListCard;
