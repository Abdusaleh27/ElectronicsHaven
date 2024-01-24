import { Typography } from "@mui/material";
import React from "react";

const ProductPrice = ({ product }) => {
  return (
    <>
    <Typography variant="body1" className="fw-bold">${product.salePrice}</Typography>
      {product.clearance && (
        <p className="product-line">
          <span className="badge bg-secondary mb-3 bg-success">Clearance</span>
        </p>
      )}
      {product.onSale && (
        <>
          <p className="search-price product-line">
            <span className="badge bg-secondary mb-2 bg-danger">
              Save ${product.dollarSavings}
            </span>
          </p>
          <p className="search-price">Was ${product.regularPrice} </p>
        </>
      )}
    </>
  );
};

export default ProductPrice;
