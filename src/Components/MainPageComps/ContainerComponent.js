import React, { useEffect, useState } from "react";
import DetailedProductDescription from "../Products/DetailedProductDescription";
import SearchPage from "../Searching/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WishList from "../WishList/WishList";
import MainPage from "./MainPage";
import { API, graphqlOperation } from "aws-amplify";
import { listUserLists } from "../../graphql/queries";
import { createUserLists, updateUserLists } from "../../graphql/mutations";
import UserDataContext from "../UserDataContext/UserDataContext";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import "./Styles/ContainerComponent.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import NavigationBar from "../NavigationBar/NavigationBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CheckOutPage from "../ShoppingCart/CheckOutPage";
import LoginPage from "../Athentications/LoginPage";
import { Alert, Box, Grid, Snackbar } from "@mui/material";
import Footer from "./Footer";
import Contact from "../Contact/Contact";
import About from "../About/About";
import Redirect from "../Athentications/Redirect";
import "../NavigationBar/Styles/NavigationBar.css";
import PageNotFound from "../PageNotFound/PageNotFound";

const ContainerComponent = () => {
  /** Hooks */
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const [cartCount, setCartCount] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [checkOutSession, setCheckOutSession] = useState("no_session");
  const [emptyCart, setEmptyCart] = useState(false);
  const [combined, setCombined] = useState(false);
  const [rerender, setRerender] = useState(false);
  /**Effects */

  /**
   *
   * Manages data storage for authenticated users and guests. combines local
   * and remote data based on authentication status. And also creates data storage for new users locally
   * and remotely in database. Data collected are shopping list, wish list and checkout session. More details
   * on the comments of the fuctions that were invoked inside this function such as addNewEntry, combineData, and
   * countCartItems.
   *
   */
  const makeNewDataEntry = async () => {
    if (authStatus === "authenticated") {
      try {
        const userData = await API.graphql(graphqlOperation(listUserLists));
        let data = userData.data.listUserLists.items;
        if (!data.length) {
          const newUserData = {
            shoppingList: [],
            wishList: [],
            currentSession: "",
          };
          data = await addNewEntry(newUserData, "new");
          setRerender(true);
        }
        if (localStorage.getItem("EHAlluserLists")) {
          combineData(data);
          localStorage.removeItem("EHAlluserLists");
        }
        countCartItems(JSON.parse(data[0]?.shoppingList), false);
      } catch (error) {
        console.log("Failed to modify data after authentication", error);
      }
    } else {
      if (
        localStorage.getItem("EHAlluserLists") === null &&
        authStatus === "unauthenticated"
      ) {
        const emptyItem = JSON.stringify({ shoppingList: [], wishList: [] });
        localStorage.setItem("EHAlluserLists", emptyItem);
        countCartItems([], false);
      } else {
        let shoppingList = JSON.parse(
          localStorage.getItem("EHAlluserLists")
        )?.shoppingList;
        countCartItems(shoppingList, false);
      }
    }
  };
  useEffect(() => {
    makeNewDataEntry();
    setCombined(false);
  }, [authStatus]);

  /**
   * counts the items currently in the cart to display it on the shopping
   * cart icon in navbar
   *
   * @param {array} cartList
   * @param {boolean} isAdding
   */
  const countCartItems = (cartList = [], isAdding = true) => {
    let count = 0;
    for (let product of cartList) {
      count += product.quantity;
    }
    if (isAdding) {
      setOpenSnackBar(true);
      if (count > cartCount) {
        setAddingToCart(true);
      } else if (count === cartCount) {
        setOpenSnackBar(false);
      }
    }
    setCartCount(count);
  };

  /**
   * updates database as part of merging local and remote data
   *
   * @param {array} data
   * @param {string} mutationType
   * @returns an array of new created list
   */
  const addNewEntry = async (data, mutationType) => {
    try {
      if (mutationType === "new") {
        const newData = await API.graphql(
          graphqlOperation(createUserLists, { input: data })
        );
        setCombined(true);
        return [newData.data.createUserLists];
      } else if (mutationType === "update") {
        await API.graphql(graphqlOperation(updateUserLists, { input: data }));
        setCombined(true);
      }
    } catch (error2) {
      console.error("creating new data error", error2);
    }
  };

  /**
   * combines the local storage data with the remote data when the
   * user signs in and get authenticated
   *
   * @param {array} data
   */
  const combineData = (data) => {
    let localData = localStorage.getItem("EHAlluserLists");
    if (localData) {
      const localObject = JSON.parse(localData);
      const localWishList = localObject.wishList;
      const localShoppingList = localObject.shoppingList;
      const remoteWishList = JSON.parse(data[0].wishList);
      const remoteShoppingList = JSON.parse(data[0].shoppingList);

      const combinedWishList = new Set([...localWishList, ...remoteWishList]); //eliminate duplicates
      const newShoppingList = combineShoppingLists(
        localShoppingList,
        remoteShoppingList
      );
      const newWishList = [...combinedWishList];

      data[0].shoppingList = JSON.stringify(newShoppingList);
      data[0].wishList = JSON.stringify(newWishList);

      delete data[0].updatedAt;
      delete data[0].createdAt;
      delete data[0].owner;
      delete data[0].__typename;
      addNewEntry(data[0], "update");
    }
  };
  /**
   * combines the local and remote shopping lists when the user logs in
   * @param {array} list1
   * @param {array} list2
   * @returns comibine list
   */
  const combineShoppingLists = (list1, list2) => {
    for (let i = 0; i < list1.length; i++) {
      for (let j = 0; j < list2.length; j++) {
        if (list1[i].sku === list2[j].sku) {
          list1[i].quantity += list2[j].quantity;
          list2.splice(j, 1);
        }
      }
    }
    return [...list1, ...list2];
  };

  /**
   * handles the closing of snackbar after adding or removing items from shopping cart
   */
  const handleClose = () => {
    setOpenSnackBar(false);
    setAddingToCart(false);
  };

  /**
   * keeps track of the current checkout session
   * @param {String} session_id
   */
  const updateCheckOutSession = (session_id) => {
    setCheckOutSession(session_id);
  };

  /**
   *  Manages the full or empty status of the shopping cart for checkout purposes
   * @param {Boolean} paid
   */
  const updateEmptyCart = (paid) => {
    setEmptyCart(paid);
  };
  return (
    <>
      <Grid container sx={{ overflowX: "hidden !important" }}>
        <Grid item xs={12}>
          <div className="row justify-content-center main-container">
            <Box maxWidth={3000}>
              {openSnackBar && (
                <Snackbar
                  sx={{ maxWidth: "200px" }}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={openSnackBar}
                  autoHideDuration={1000}
                  key={"topcenter"}
                  onClose={handleClose}
                >
                  {addingToCart ? (
                    <Alert
                      severity="success"
                      sx={{ width: "100%" }}
                      variant="filled"
                    >
                      Item added
                    </Alert>
                  ) : (
                    <Alert
                      severity="error"
                      sx={{ width: "100%" }}
                      variant="filled"
                    >
                      Item removed
                    </Alert>
                  )}
                </Snackbar>
              )}
              <UserDataContext.Provider
                value={{
                  countCartItems,
                  emptyCart,
                  updateEmptyCart,
                }}
              >
                <BrowserRouter>
                  <>
                    <NavigationBar cartCount={cartCount} />

                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/search/:name/" element={<SearchPage />} />
                      <Route
                        path="/productdetails/:name/"
                        element={<DetailedProductDescription />}
                      />
                      <Route
                        path="/wishlist/"
                        element={<WishList combined={combined} />}
                      />
                      <Route
                        path="/shoppingcart/"
                        element={
                          <ShoppingCart
                            checkOutSession={checkOutSession}
                            updateCheckOutSession={updateCheckOutSession}
                            combined={combined}
                            rerender={rerender}
                            setRerender={setRerender}
                          />
                        }
                      />
                      <Route
                        path="/success-page/"
                        element={<CheckOutPage setCartCount={setCartCount} />}
                      />

                      <Route
                        path="/login/"
                        element={
                          <LoginPage makeNewDataEntry={makeNewDataEntry} />
                        }
                      />
                      <Route path="/contact/" element={<Contact />} />
                      <Route path="/about/" element={<About />} />
                      <Route path="/redirect/" element={<Redirect />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <div className="wrapper row ">
                      <Footer></Footer>
                    </div>
                  </>
                </BrowserRouter>
              </UserDataContext.Provider>
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ContainerComponent;
