import { Authenticator } from "@aws-amplify/ui-react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { updateUserLists } from "../../graphql/mutations";
import { listUserLists } from "../../graphql/queries";

/**
 * Success page after the customer completes checkout process. Stripe
 * redirects customer to this page
 */
const CheckOutPage = ({ setCartCount }) => {
  let stripePromise;
  const param = window.location.href;
  const [successfulPayment, setSuccessfullPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };
  useEffect(() => {
    //verfies the user was redericted by stripe and payment was accepted.
    // After the initial message, the session expires when refreshing or navigating
    // back to this session link so this session can't be used again for checkout

    const session_id = param.split("=")[1];
    const stripeTest = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      const myInit = {
        headers: {
          Authorization: token,
        },

        queryStringParameters: {
          session_id,
        },
      };
      let storedSessionID = "";
      let data;
      try {
        const userData = await API.graphql(graphqlOperation(listUserLists));
        data = userData.data.listUserLists.items[0];
        storedSessionID = data.currentSession;
        if (storedSessionID !== session_id || storedSessionID === "") {
          setSuccessfullPayment(false);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log("Failed to fetch payment session");
      }
      API.get("stripepayment", "/stripepayment", myInit)
        .then((res) => {
          if (res.status === "complete" && res.payment_status === "paid") {
            setSuccessfullPayment(true);
          } else {
            setSuccessfullPayment(false);
          }
          updateCheckOutSession(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("invalid payment", error);
          setSuccessfullPayment(false);
          setLoading(false);
        });
    };
    if (typeof session_id === "string" && session_id !== "") stripeTest();
  }, []);

  const updateCheckOutSession = async (newList) => {
    if (newList) {
      newList.currentSession = "";
      newList.shoppingList = [];
      delete newList?.owner;
      delete newList?.__typename;
      delete newList?.updatedAt;
      delete newList?.createdAt;
    }
    try {
      const updatedList = await API.graphql({
        query: updateUserLists,
        variables: { input: newList },
      });
      setCartCount(0);
    } catch (error) {
      console.error("failed to update shoppinglist", error);
    }
  };
  return (
    <>
      <Box sx={{ marginTop: "150px" }}>
        <Authenticator>
          {({ signOut }) => (
            <div className="row">
              <div className="col d-flex justify-content-center">
                {loading ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="warning"
                    disabled
                  >
                    <>
                      <span className="process">Completing Process... </span>{" "}
                      <CircularProgress />
                    </>
                  </Button>
                ) : (
                  <Paper
                    sx={{
                      background: "#F0F0F0",
                      text: "white",
                      paddingY: "25px",
                      width: "450px",
                    }}
                  >
                    {successfulPayment ? (
                      <>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#3471ca",
                          }}
                        >
                          {" "}
                          Thank you for shopping at Electronics Haven{" "}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "18px", marginTop: "25px" }}
                        >
                          {" "}
                          We will notify you when your items ship{" "}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Alert
                          variant="filled"
                          severity="error"
                          sx={{ marginX: "15px" }}
                        >
                          This is page has expired
                        </Alert>
                      </>
                    )}

                    <br />
                    <Link to="/">
                      <Button variant="contained">Continue Shopping</Button>
                    </Link>
                  </Paper>
                )}
              </div>
            </div>
          )}
        </Authenticator>
      </Box>
    </>
  );
};

export default CheckOutPage;
