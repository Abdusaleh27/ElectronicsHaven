import { useAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Landing page for google authentication that redirects to previous page
 * the user was on before logging in or out using google. This is a work around
 * the limitation of dynamic redirection of AWS amplify. The most recent page address
 * is always stored in localStorage by NavigationBar and HamburgerMenu compoenents.
 *
 */
const Redirect = () => {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.user]);
  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (authStatus === "authenticated" || authStatus === "unauthenticated")
      navigate(lastPage ? lastPage : "/");
  }, [authStatus]);
  return <></>;
};

export default Redirect;
