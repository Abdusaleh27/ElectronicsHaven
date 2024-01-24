import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "../../aws-exports";
import { listUserLists } from "../../graphql/queries";
import { createUserLists, updateUserLists } from "../../graphql/mutations";
import { API, Amplify, Auth, graphqlOperation } from "aws-amplify";
import ProductCard from "../Products/ProductCard";
import CheckOut from "./CheckOut";
import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./Styles/ShoppingCart.css";
Amplify.configure(config);

const ShoppingCart = ({ combined, rerender, setRerender }) => {
  /**
   * States
   */
  const [listsData, setListsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [proccessingPayment, setProcessingPayment] = useState(false);
  const { authStatus } = useAuthenticator((context) => [context.user]);

  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down(692));
  const xlUpBreakPoint = useMediaQuery(theme.breakpoints.up("xl"));
  const xlDownBreakPoint = useMediaQuery(theme.breakpoints.down("xl"));
  const mdBreakPoint = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const currentLocation = useLocation();

  /**
   * effects
   */
  useEffect(() => {
    fetchShoppingCartData();
  }, [authStatus, combined]);

  useEffect(() => {
    if (rerender) {
      const refreshContent = async () => {
        await fetchShoppingCartData();
        setRerender(false);
      };
      refreshContent();
    }
  }, [rerender]);
  /**
   * Fetches shopping cart items that are either stored locally or remotely
   */
  const fetchShoppingCartData = async () => {
    try {
      let shoppingCartData = [];
      if (authStatus === "authenticated") {
        const userData = await API.graphql(graphqlOperation(listUserLists));
        const data = userData.data.listUserLists.items;
       
        setListsData({...data[0]});
        shoppingCartData = data[0]?.shoppingList ? JSON.parse(data[0]?.shoppingList) : [];
      } else if (authStatus === "unauthenticated") {
        let localData = JSON.parse(localStorage.getItem("EHAlluserLists"));
        shoppingCartData = localData?.shoppingList
          ? localData?.shoppingList
          : [];
      }
      shoppingCartData && setCartItems([...shoppingCartData]);
      shoppingCartData && calculateCartTotalAndCount(shoppingCartData);
    } catch (error) {
      console.error("Failed to fetch data for ShoppingCart", error);
    }
  };

  /**
   * Counts cart items and calculates the total of all the item in cart
   * @param {Array} products
   */
  const calculateCartTotalAndCount = (products) => {
    let total = 0;
    let count = 0;
    let grand = 0;
    let totalDiscount = 0;
    for (let product of products) {
      grand += product.regularPrice * product.quantity;
      total += product.salePrice * product.quantity;
      count += product.quantity;
      if (product.salePrice < product.regularPrice)
        totalDiscount +=
          (product.regularPrice - product.salePrice) * product.quantity;
    }
    setDiscount(Math.round(totalDiscount * 100) / 100);
    setCartTotal(Math.round(total * 100) / 100);
    setGrandTotal(Math.round(grand * 100) / 100);
    setNumberOfItems(count);
  };

  /**
   * Refreshes the contents of the cart
   */
  const refreshData = () => {
    fetchShoppingCartData();
  };
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };

  /**
   * stores the current checkout session in data base for the current
   * authenticated user.
   * @param {String} id
   */
  const updateCheckOutSession = async (id) => {
    let newList = listsData;
    if (newList) newList.currentSession = id ? id : "";
    delete newList?.owner;
    delete newList?.__typename;
    delete newList?.updatedAt;
    delete newList?.createdAt;
    try {
      await API.graphql({
        query: updateUserLists,
        variables: { input: newList },
      });
    } catch (error) {
      console.error("failed to update shoppinglist", error);
    }
  };

  /**
   * Starts checkout process when customer clicks on the checkout button
   *
   * @param {int} newTotal
   */
  const updateCartTotal = async (newTotal) => {
    if (cartTotal > 0 && listsData && authStatus === "authenticated") {
      const stripe = await getStripe();
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      const myInit = {
        headers: {
          Authorization: token,
        },
        body: { cartItems },
      };
      setProcessingPayment(true);
      API.post("stripepayment", "/stripepayment", myInit)
        .then(async (res) => {
          if (res.statusCode === 500) return;
          updateCheckOutSession(res.id);
          stripe.redirectToCheckout({ sessionId: res.id });
        })
        .catch((error) => console.log("Checkout failed", error));
    } else if (authStatus === "unauthenticated") {
      navigate("/login", {
        state: {
          prevPage: currentLocation.pathname,
        },
      });
    }
  };

  return (
    <>
      <div className="row mt-5"></div>

      <h5 className="mt-5 mb-5">Shopping Cart</h5>
      <Box mb={4}>
        <Paper
          sx={{
            maxWidth: "360px",
            margin: "auto",
            height: "130px",
            paddingTop: "10px",
          }}
          elevation={5}
        >
          <Typography textAlign={"center"} mb={1}>
            Use the following Demo Visa #{" "}
          </Typography>
          <Typography sx={{ fontWeight: "bold", color: "brown" }} mb={1}>
            4242 4242 4242 4242
          </Typography>
          <Typography mb={3}>
            <span className="cc_info">Exp</span> (future date){" "}
            <span className="cc_info">CVC</span> any
          </Typography>
        </Paper>
      </Box>
      {!targetBreakPoint ? (
        <Grid
          container
          mb={5}
          paddingX={
            (mdBreakPoint && "1.5%") ||
            (xlDownBreakPoint && "6%") ||
            (xlUpBreakPoint && "15%")
          }
        >
          <Grid item xs={8} lg={9} md={8} sm={8} xl={9}>
            {cartItems.length > 0 ? (
              cartItems.map((product) => {
                return (
                  <ProductCard
                    product={product}
                    cardType="shoppingcart"
                    refreshData={refreshData}
                    key={product.name + product.sku}
                  />
                );
              })
            ) : (
              <h6 className="mt-5">Shopping cart is currently empty</h6>
            )}
          </Grid>
          <Grid item xs={4} lg={3} md={4} sm={4} xl={3}>
            <div className="row mt-2">
              <CheckOut
                total={cartTotal}
                discount={discount}
                grandTotal={grandTotal}
                updateCartTotal={updateCartTotal}
                processingPayment={proccessingPayment}
              />
            </div>
          </Grid>
          <div>
            <br />
          </div>
        </Grid>
      ) : (
        <>
          <Grid container position={"relative"} mb={5}>
            <Grid
              item
              xs={12}
              sx={{
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
            >
              <Box>
                <CheckOut
                  total={cartTotal}
                  discount={discount}
                  grandTotal={grandTotal}
                  updateCartTotal={updateCartTotal}
                  processingPayment={proccessingPayment}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {cartItems.length ? (
                  cartItems.map((product) => {
                    return (
                      <ProductCard
                        product={product}
                        cardType="shoppingcart"
                        refreshData={refreshData}
                        key={product.name + product.sku}
                        resizeImage={targetBreakPoint}
                      />
                    );
                  })
                ) : (
                  <h6 className="mt-5">Shopping cart is currently empty</h6>
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ShoppingCart;
