import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "../../aws-exports";
import { listUserLists } from "../../graphql/queries";
import { createUserLists } from "../../graphql/mutations";
import { API, Amplify, graphqlOperation } from "aws-amplify";
import ProductCard from "../Products/ProductCard";
import { Box, Container, Paper, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import "../TrendingProducts/Styles/TrendingProducts.css";
Amplify.configure(config);

/**
 * Stores and displays customer's favorite list
 * @param {Object} props
 *
 */
const WishList = ({ combined, rerender, setRerender }) => {
  /**
   * States
   */
  const [userLists, setUserLists] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { authStatus } = useAuthenticator((context) => [context.user]);
  useLocation();

  /**
   * Effects
   */
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    fetchUserData();
  }, [authStatus, combined]);

  useEffect(() => {
    if (rerender) {
      const refreshContent = async () => {
        await fetchUserData();
        setRerender(false);
      };
      refreshContent();
    }
  }, [rerender]);

  /**
   * Fetches the wish list for the current user that is stored locally
   * or remotely based on the authentication status.
   *
   */
  const fetchUserData = async () => {
    try {
      let wishListData = [];
      if (authStatus === "authenticated") {
        const userData = await API.graphql(graphqlOperation(listUserLists));
        const data = userData.data.listUserLists.items;

        setUserLists([...data]);
        wishListData = data[0]?.wishList ? JSON.parse(data[0]?.wishList) : [];
      } else if (localStorage.getItem("EHAlluserLists")) {
        const localData = JSON.parse(localStorage.getItem("EHAlluserLists"));
        wishListData = localData.wishList;
      }

      setWishList([...wishListData]);
    } catch (error) {
      console.error("Failed to fetch data for WishList", error);
    }
  };

  /**
   * Refetches the data for updating purposes when the customer
   * adds or removes items from the wish list
   */
  const refreshData = () => {
    fetchUserData();
  };

  const updateDetailFavorite = (isFavored) => {
    return isFavored;
  };
  return (
    <>
      <>
        <Box p={1} sx={{ marginTop: 14 }}>
          <Container maxWidth="xl">
            <Paper
              square
              elevation={0}
              sx={{ backgroundColor: "#F0F0F0", p: 1, paddingBottom: "30px" }}
            >
              <h4 className="trending-header mb-4 mt-2">Wish List</h4>
              <Grid container spacing={2} direction="row">
                {wishList.length > 0 ? (
                  wishList.map((product, index) => (
                    <ProductCard
                      key={product.name + product.sku}
                      product={product}
                      cardType="wishlist"
                      refreshData={refreshData}
                      updateDetailFavorite={updateDetailFavorite}
                    />
                  ))
                ) : (
                  <Grid item xs={12} mt={2}>
                    <h6>Please add items to wishList</h6>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Container>
        </Box>
      </>
    </>
  );
};

export default WishList;
