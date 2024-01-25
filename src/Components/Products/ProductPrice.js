import { Typography } from "@mui/material";
import React from "react";

const ProductPrice = ({ product }) => {
  return (
    <>
      <Typography variant="body1" className="fw-bold">
        ${product.salePrice}
      </Typography>
      {!product.clearance && !product.onSale && <p></p>}

      {product.onSale && (
        <>
          <p className="search-price">Was ${product.regularPrice} </p>
          <p className="search-price product-line">
            {product.clearance && (
              <>
               
                  <span className="badge bg-secondary mb-3 bg-success mx-2">
                    Clearance
                  </span>
              </>
            )}
            <span className="badge bg-secondary mb-2 bg-danger">
              Save ${product.dollarSavings}
            </span>
          </p>
          <p></p>
        </>
      )}
    </>
  );
};

export default ProductPrice;
