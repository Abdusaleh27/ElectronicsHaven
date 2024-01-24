import React, { useContext, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createUserLists, updateUserLists } from "../../graphql/mutations";
import { listUserLists } from "../../graphql/queries";
import SearchCard from "./SearchCard";
import WishListCard from "./WishListCard";
import ShoppingCartCard from "./ShoppingCartCard";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, Grid, IconButton } from "@mui/material";
import { Favorite, ShoppingCartRounded } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import UserDataContext from "../UserDataContext/UserDataContext";
/**
 * renders a single product card of different types, such as
 * search card, cart card, wish list card, slider card
 */
const ProductCard = ({
  product,
  cardType = "search",
  refreshData,
  updateDetailFavorite,
}) => {
  /**
   * States
   */
  const [userLists, setUserLists] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [currentIndex, setcurrentIndex] = useState(-1);
  const [removingCartItem, setRemovingCartItem] = useState(false);
  const [removingWishListItem, setRemovingWishListItem] = useState(false);
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const [isFavored, setIsFavored] = useState(false);
  const { countCartItems } = useContext(UserDataContext);
  const [isOverLimit, setIsOverLimit] = useState(false);
  /**
   * effects
   */
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    updateAllListData();
  }, [
    wishList,
    shoppingList,
    removingCartItem,
    removingWishListItem,
    isFavored,
  ]);

  /**
   * return a string representation of the product object for storing purposes
   */
  const makeProductString = () => {
    const {
      sku,
      name,
      image,
      description,
      salePrice,
      regularPrice,
      customerReviewAverage,
      customerReviewCount,
      quantityLimit,
    } = product;
    const productStr = JSON.stringify({
      sku,
      name,
      image,
      description,
      salePrice,
      customerReviewAverage,
      regularPrice,
      customerReviewCount,
      quantityLimit,
    });
    return productStr;
  };

  /**
   * updates wishlist
   * @param {Array} newList
   */
  const updateWishList = (newList) => {
    setWishList([...newList]);
  };

  /**
   * updates shopping and wish lists locally or remotely
   * @param {Array} lists
   * @param {String} listName
   */
  const updateAllListData = async (lists, listName) => {
    let list = userLists[0];
    if (list && authStatus === "authenticated") {
      list.wishList = JSON.stringify(wishList);
      list.shoppingList = JSON.stringify(shoppingList);
      try {
        const updatedList = await API.graphql({
          query: updateUserLists,
          variables: { input: userLists[0] },
        });
        let newData = updatedList.data.updateUserLists;
        deleteDefaults(newData);
        if (cardType === "wishlist" || cardType === "shoppingcart")
          refreshData();
      } catch (error) {
        console.error("failed to update shoppinglist", error);
      }
    } else if (authStatus === "unauthenticated") {
      let localLists = JSON.parse(localStorage.getItem("EHAlluserLists"));
      if (shoppingList.length || removingCartItem) {
        localLists.shoppingList = shoppingList;
        setRemovingCartItem(false);
      }
      if (wishList.length || removingWishListItem) {
        localLists.wishList = wishList;
        setRemovingWishListItem(false);
      }
      const updatedLists = JSON.stringify(localLists);
      localStorage.setItem("EHAlluserLists", updatedLists);
      if (cardType === "wishlist" || cardType === "shoppingcart") refreshData();
    }
  };

  /**
   * For AWS graphQL query purposes
   * @param {Object} lists
   */
  const deleteDefaults = (lists) => {
    delete lists.updatedAt;
    delete lists.createdAt;
    delete lists.owner;
    delete lists.__typename;
  };

  /**
   * Fetches user date from storage. Locally if guest or remotely if authenticated
   */
  const fetchUserData = async () => {
    if (authStatus === "authenticated") {
      try {
        const userData = await API.graphql(graphqlOperation(listUserLists));
        if (!userData.data.listUserLists.items.length) {
          addNewEntry();
        }
        const data = userData.data.listUserLists.items;

        const lists = data[0];
        deleteDefaults(lists);
        setUserLists(data);
        setWishList(JSON.parse(data[0].wishList));
        setShoppingList(JSON.parse(data[0].shoppingList));

        if (data[0]?.wishList.includes(`"sku":${product.sku}`)) {
          setIsFavored(true);
          cardType === "productdetails" && updateDetailFavorite(true);
        } else {
          setIsFavored(false);
          cardType === "productdetails" && updateDetailFavorite(false);
        }
      } catch (error) {
        console.error("Failed to fetch product card user data!", error);
      }
    } else {
      const userData = JSON.parse(localStorage.getItem("EHAlluserLists"));
      setWishList(userData.wishList);
      setShoppingList(userData.shoppingList);
      if (JSON.stringify(userData.wishList).includes(`"sku":${product.sku}`)) {
        setIsFavored(true);
        cardType === "productdetails" && updateDetailFavorite(true);
      } else {
        setIsFavored(false);
        cardType === "productdetails" && updateDetailFavorite(false);
      }
    }
  };

  /**
   * creates data for new user remotely in database using AWS graphQL and DynamoDB
   */
  const addNewEntry = async () => {
    const newUserData = {
      shoppingList: "[]",
      wishList: "[]",
      currentSession: "",
    };
    try {
      await API.graphql(
        graphqlOperation(createUserLists, { input: newUserData })
      );
    } catch (error2) {
      console.error("creating new data error", error2);
    }
  };

  /**
   * Handles the click on the Add to cart button
   * @param {Event} e
   */
  const handleShoppingCartClick = async (e) => {
    if (authStatus === "authenticated") {
      try {
        const userData = await API.graphql(graphqlOperation(listUserLists));
        const shoppingCartList =
          userData.data.listUserLists.items[0].shoppingList;
        handleShoppingListUpdate(e, shoppingCartList);
      } catch (error) {
        console.log("Failed to fetch shopping list in product card", error);
      }
    } else if (authStatus === "unauthenticated") {
      const allUserLists = JSON.parse(localStorage.getItem("EHAlluserLists"));
      const shoppingCart = allUserLists.shoppingList;
      handleShoppingListUpdate(e, JSON.stringify(shoppingCart));
    }
  };

  /**
   * Updates the shopping cart when add to cart button is click by adding the product
   * to cart and storing it locally or remotely based on authenticated status
   *
   * @param {Event} e
   * @param {Array} shoppingCartList
   */
  const handleShoppingListUpdate = (e, shoppingCartList) => {
    const productString = makeProductString();
    let parsedList = JSON.parse(shoppingCartList);
    if (
      e.target.innerText !== "REMOVE" &&
      !e.target.classList.contains("trash-bin")
    ) {
      if (!shoppingCartList.includes(`"sku":${product.sku}`)) {
        const updatedCartList = [
          ...parsedList,
          { ...JSON.parse(productString), quantity: 1 },
        ];
        setShoppingList(updatedCartList);
        countCartItems(updatedCartList);
      } else {
        let index = -1;
        if (currentIndex === -1) {
          let curretItem = parsedList.filter(
            (item) => item.sku === product.sku
          )[0];
          index = parsedList.indexOf(curretItem);
          setcurrentIndex(index);
        }
        let quantity = parsedList[index === -1 ? currentIndex : index].quantity;
        if (e.target.innerText !== "-" || e.target.name === "quantity") {
          if (e.target.name === "quantity") {
            if (e.target.value > 0) {
              parsedList[index === -1 ? currentIndex : index].quantity =
                parseInt(e.target.value);
            } else {
              parsedList = parsedList.filter(
                (currentProduct) => currentProduct.sku !== product.sku
              );
              setRemovingCartItem(true);
              setShoppingList([...parsedList]);
              countCartItems(parsedList);
            }
          } else if (quantity + 1 <= product.quantityLimit) {
            parsedList[index === -1 ? currentIndex : index].quantity += 1;
          } else {
            setIsOverLimit(true);
          }
        } else if (e.target.innerText === "-") {
          let currentProduct = parsedList[index === -1 ? currentIndex : index];
          currentProduct.quantity -= 1;
          if (currentProduct.quantity === 0) {
            parsedList = parsedList.filter(
              (currentProduct) => currentProduct.sku !== product.sku
            );
            setRemovingCartItem(true);
            setShoppingList([...parsedList]);
            countCartItems(parsedList);
          }
        }
        setShoppingList([...parsedList]);
        countCartItems(parsedList);
      }
    } else if (
      e.target.innerText === "REMOVE" ||
      e.target.classList.contains("trash-bin")
    ) {
      const newList = parsedList.filter(
        (currentProduct) => currentProduct.sku !== product.sku
      );
      setRemovingCartItem(true);
      setShoppingList([...newList]);
      countCartItems(newList);
    }
  };

  /**
   * Handles the click of ❤ on the product card, by adding or removing item
   * from wish list
   */
  const handleClick = async () => {
    try {
      let currentWishList = "";
      if (authStatus === "authenticated") {
        const userData = await API.graphql(graphqlOperation(listUserLists));
        const data = userData.data.listUserLists.items;
        currentWishList = data[0].wishList;
      } else {
        const localData = JSON.parse(localStorage.getItem("EHAlluserLists"));
        currentWishList = JSON.stringify(localData.wishList);
      }

      updateWishListData(currentWishList);
    } catch (error) {
      console.log("Failed to update wishlist", error);
    }
  };

  /**
   * updates the wish list
   *
   * @param {Array} currentWishList
   */
  const updateWishListData = (currentWishList) => {
    let filteredWishList = "";
    const productString = makeProductString();
    if (currentWishList.includes(`"sku":${product.sku}`)) {
      filteredWishList = JSON.parse(currentWishList).filter(
        (currentProduct) => currentProduct.sku !== product.sku
      );
      updateWishList(filteredWishList);
      setRemovingWishListItem(true);
      setIsFavored(false);
      updateDetailFavorite(false);
    } else if (cardType === "search" || cardType === "productdetails") {
      filteredWishList = [
        ...JSON.parse(currentWishList),
        JSON.parse(productString),
      ];
      setIsFavored(true);
      updateWishList(filteredWishList);
      updateDetailFavorite(true);
    }
  };
  return (
    <>
      {cardType === "search" && (
        <SearchCard
          isOverLimit={isOverLimit}
          isFavored={isFavored}
          product={product}
          wishListclicked={handleClick}
          shoppingCartClicked={handleShoppingCartClick}
        />
      )}
      {cardType === "wishlist" && (
        <WishListCard
          product={product}
          wishListclicked={handleClick}
          shoppingCartClicked={handleShoppingCartClick}
          isOverLimit={isOverLimit}
        />
      )}
      {cardType === "shoppingcart" && (
        <ShoppingCartCard
          product={product}
          wishListclicked={handleClick}
          shoppingCartClicked={handleShoppingCartClick}
        />
      )}

      {cardType === "productdetails" && (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                startIcon={<ShoppingCartRounded />}
                onClick={handleShoppingCartClick}
                disabled={isOverLimit}
                sx={{ fontSize: "13px" }}
              >
                {isOverLimit ? "Max Quantity" : "Add Item"}
              </Button>
              <IconButton
                sx={{ marginLeft: 2, textSizeAdjust: 5 }}
                onClick={handleClick}
              >
                {isFavored ? (
                  <Favorite color="primary"></Favorite>
                ) : (
                  <FavoriteBorderOutlinedIcon color="primary" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductCard;
