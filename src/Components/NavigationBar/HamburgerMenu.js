import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { v4 as UUID } from "uuid";
import LogOutConfirmation from "./LogOutConfirmation";

/**
 * Hamburger menu for navigation bar in mobile mode
 *
 */
const HamburgerMenu = () => {
  /**
   * Effects
   */
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const navItems = [
    "Home",
    "Contact",
    "About",
    authStatus === "authenticated" ? "Logout" : "Login",
  ];
  const currentLocation = useLocation();

  /**
   * Handles the opening and closing of Hamburger menu
   * @param {Event} e
   */
  const handleClick = (e) => {
    localStorage.setItem("lastPage", currentLocation.pathname);
    setOpen(!open);
    let target = e.target.innerText;
    if (target === "Logout") {
      setOpenLogOut(true);
    } else {
      target = target.toLowerCase();
      navigate(`/${target === "home" ? "" : target}`, {
        state: {
          prevPage: currentLocation.pathname,
        },
      });
    }
  };
  const handleClose = (confirmed) => {
    if (confirmed) Auth.signOut();
    setOpenLogOut(false);
  };
  return (
    <>
      <LogOutConfirmation open={openLogOut} handleClose={handleClose} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ textAlign: "center", width: 250 }}>
          <List>
            {navItems.map((item) => (
              <Fragment key={UUID()}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={handleClick}
                  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
      <IconButton sx={{ color: "white" }} onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HamburgerMenu;
