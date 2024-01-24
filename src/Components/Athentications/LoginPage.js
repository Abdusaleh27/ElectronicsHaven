import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const LoginPage = ({ makeNewDataEntry }) => {
  /**
   * Hooks
   */
  const prevPage = useLocation();
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.user]);
  /**
   * When the authentication status changes to authenticated,
   * user gets redirected to the previous page
   */
  useEffect(() => {
    if (authStatus === "authenticated") {
      goToPreviousPage();
    }
  }, [authStatus]);
  const goToPreviousPage = () => {
    navigate(prevPage?.state ? prevPage.state.prevPage : "/");
  };
  return (
    <>
      <Box sx={{ marginTop: "150px", marginBottom: "70px" }}>
        <Authenticator></Authenticator>
      </Box>
    </>
  );
};

export default LoginPage;
