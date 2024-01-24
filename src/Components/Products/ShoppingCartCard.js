import {
  Button,
  ButtonGroup,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShoppingCartCard = ({ product, shoppingCartClicked }) => {
  /**
   * Hooks
   */
  const [quantity, setQuantity] = useState(1);
  const [exceededLimit, setExceededLimit] = useState(false);
  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    setQuantity(product?.quantity);
  }, [product?.quantity]);

  const handleShoppingCart = async (e) => {
    setExceededLimit(false);
    if (
      product.quantity + 1 > product.quantityLimit &&
      e.target.innerText === "+"
    ) {
      setExceededLimit(true);
    } else {
      shoppingCartClicked(e);
    }
  };

  const handleOutOfFocus = (e) => {
    if (!isNaN(e.target.value) && e.target.value !== "") {
      if (e.target.value > product.quantityLimit) {
        setQuantity(product.quantity);
        setExceededLimit(true);
      } else if (e.target.value < 0) {
        setQuantity(product.quantity);
      } else {
        shoppingCartClicked(e);
      }
    } else {
      setQuantity(product.quantity);
    }
  };
  const handleFocus = () => {
    setExceededLimit(false);
  };
  const handleChange = (e) => {
    const val = e.target.value;
    if (!isNaN(Number(val))) setQuantity(val);
  };
  return (
    <>
      <div className="row mx-2">
        <div className="col">
          <Paper elevation={3} m={2}>
            <div className="row mt-2 mx-1 mb-2">
              <div className="col-sm-5 col-md-3 col-lg-3 mb-5 mt-4">
                {product && (
                  <Link
                    to={`/productdetails/${(product.name + "sku" + product.sku)
                      .split("/")
                      .join()}`}
                  >
                    <img
                      src={product.image + ";maxHeight=130;maxWidth=120"}
                      alt="product"
                      className="img-fluid"
                    />
                  </Link>
                )}
              </div>
              <div className="col-sm-6 col-md-5 col-lg-4 mt-4 mb-4">
                <Link
                  to={`/productdetails/${(product.name + "sku" + product.sku)
                    .split("/")
                    .join()}`}
                >
                  <p className="product-name">{product.name}</p>
                </Link>
              </div>
              <div
                className={`col-sm-12 col-md-3 col-lg-5 ${
                  targetBreakPoint ? "" : "mt-4"
                } mb-4`}
              >
                <Typography mb={1} variant="body1" className="fw-bold">
                  $
                  {Math.round(product.salePrice * product.quantity * 100) / 100}
                  {product.quantity > 1 && (
                    <span className="each"> (${product.salePrice} each)</span>
                  )}
                </Typography>

                <ButtonGroup
                  aria-label="outlined button group"
                  size={"small"}
                  sx={{ marginBottom: "8px" }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleShoppingCart}
                    size="small"
                    className={product.quantity === 1 ? "trash-bin" : ""}
                    name="-"
                  >
                    -
                  </Button>
                  <TextField
                    id="outlined-size-small"
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                        width: "47px",
                        height: "38px",
                        fontSize: "14px",
                      },
                    }}
                    type="text"
                    size="small"
                    value={quantity}
                    color="primary"
                    onBlur={handleOutOfFocus}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    name="quantity"
                  />
                  <Button
                    variant="outlined"
                    onClick={handleShoppingCart}
                    size="small"
                    name="+"
                  >
                    +
                  </Button>
                </ButtonGroup>
                {exceededLimit && (
                  <p className="amount-field-invalid">
                    <span className="badge mb-2 bg-danger">
                      limit per customer {product.quantityLimit}
                    </span>
                  </p>
                )}
                <Button
                  variant="contained"
                  onClick={handleShoppingCart}
                  size="small"
                  sx={{
                    marginLeft: "15px",
                    marginBottom: "12px",
                    marginTop: "10px",
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>

            <div className="mb-2"></div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartCard;
