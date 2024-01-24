import React, { useState } from "react";
import ProductCard from "../Products/ProductCard";
import { Box, Grid, Typography } from "@mui/material";

/**
 * Renders the products returned from search results
 */

const NextSearchPage = ({ products }) => {
  const [favored, setFavored] = useState(false);

  const updateFavored = (isFavored) => {
    setFavored(isFavored);
  };
  return (
    <Grid container spacing={4} mb={5}>
      {products.length ? (
        products.map((product) => {
          return (
            <Grid
              item
              className="product-card"
              key={product.name + product.sku}
            >
              <ProductCard
                product={product}
                key={product.sku + product.name}
                updateDetailFavorite={updateFavored}
              />
            </Grid>
          );
        })
      ) : (
        <Grid
          className="row"
          item
          textAlign="center"
          justifyContent={"center"}
          width={"100%"}
        >
          <Box textAlign={"center"} width={"100%"} mt={10}>
            <Typography fontWeight={"bold"}>"No products found"</Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
export default NextSearchPage;
