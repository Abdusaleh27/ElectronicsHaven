import { Box, Button, CircularProgress, Paper } from "@mui/material";
import React from "react";

/**
 * Checkout component in shopping cart that contains the checkout button
 */
const CheckOut = ({
  total = 0,
  updateCartTotal,
  grandTotal,
  discount,
  processingPayment,
}) => {
  const handleCheckout = () => {
    updateCartTotal();
  };
  return (
    <Box>
      <Paper
        square={true}
        elevation={1}
        sx={{
          marginBottom: "5px",
          paddingBottom: "10px",
          paddingTop: "10px",
          backgroundColor: "#F0F0F0",
        }}
      >
        <div className="row">
          {total > 0 && (
            <>
              <div className="mx-3 col text-start cart-totals">
                <p>Regular</p>
                {discount > 0 && <p>Savings</p>}
                <p>Total</p>
                <p>Taxes</p>
              </div>
              <div className="col text-start cart-totals">
                <p>${grandTotal.toFixed(2)}</p>
                {discount > 0 && <p>-${discount.toFixed(2)}</p>}
                <p>${total.toFixed(2)}</p>
                <p>${(Math.round(total * 0.09 * 100.0) / 100.0).toFixed(2)}</p>
                <hr></hr>
                <p>${(Math.round(total * 1.09 * 100.0) / 100.0).toFixed(2)} </p>
              </div>
            </>
          )}
          {total === 0 && (
            <p className="cart-totals">please Add items to cart</p>
          )}
          <Box>
            <div className="row mx-3">
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={handleCheckout}
                disabled={total === 0 || processingPayment}
              >
                {processingPayment ? (
                  <>
                    <span className="process">processing </span>{" "}
                    <CircularProgress />
                  </>
                ) : (
                  "Checkout"
                )}
              </Button>
            </div>
          </Box>
        </div>
      </Paper>
    </Box>
  );
};

export default CheckOut;
