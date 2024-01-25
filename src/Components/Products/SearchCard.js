import React, { useState } from "react";
import BriefProductDescription from "./BriefProductDescription";
import ProductPrice from "./ProductPrice";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./Styles/ProductCardStyles.css";
import {
  Favorite,
  FavoriteBorderOutlined,
  ShoppingCartRounded,
} from "@mui/icons-material";

const SearchCard = ({
  product,
  wishListclicked,
  shoppingCartClicked,
  isFavored,
  isOverLimit,
}) => {
  const [hovering, setHovering] = useState(false);
  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down("md"));

  const handleWishList = () => {
    wishListclicked();
  };

  const handleShoppingCart = (e) => {
    shoppingCartClicked(e);
  };
  const handleEnter = () => {
    setHovering(!hovering);
  };
  return (
    <>
      <Paper
        elevation={hovering ? 10 : 2}
        square={hovering ? false : true}
        onMouseEnter={handleEnter}
        onMouseLeave={handleEnter}
      >
        <Grid container spacing={2}>
          <Grid item xs={targetBreakPoint ? 6 : 4}>
            {product && (
              <Link
                to={`/productdetails/${(product.name + "sku" + product.sku)
                  .split("/")
                  .join()}`}
              >
                <img
                  className="img-fluid search-image mb-1"
                  src={product.image + ";maxHeight=160;maxWidth=260"}
                  alt="product"
                />
              </Link>
            )}
          </Grid>

          <Grid item xs={targetBreakPoint ? 6 : 4}>
            <BriefProductDescription product={product} />
          </Grid>
          <Grid item xs={targetBreakPoint ? 12 : 4}>
            <ProductPrice product={product} />

            <Button
              variant="contained"
              endIcon={<ShoppingCartRounded />}
              onClick={handleShoppingCart}
              size="small"
              disabled={isOverLimit}
            >
              Add
            </Button>
            <IconButton
              sx={{ marginLeft: 2, textSizeAdjust: 5 }}
              onClick={handleWishList}
            >
              {isFavored ? (
                <Favorite color="primary"></Favorite>
              ) : (
                <FavoriteBorderOutlined color="primary" />
              )}
            </IconButton>
            {isOverLimit && <span class="badge mb-3 bg-dark">max in cart</span>}
            <div className="mb-2"></div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SearchCard;
