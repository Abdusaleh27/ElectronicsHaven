import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import HamburgerMenu from "./HamburgerMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Logo from "../../Logos/Logo.PNG";
import LogoSmall from "../../Logos/TabLogo.JPG";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import "./Styles/NavigationBar.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import LogOutConfirmation from "./LogOutConfirmation";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavigationBar = ({ cartCount }) => {
  /**
   * Hooks
   */
  const navigate = useNavigate();
  const customeTheme = createTheme({
    palette: {
      secondary: {
        main: "#f0ead4",
      },
      primary: {
        main: "#3471ca",
      },
      success: {
        main: "#ff1744",
      },
    },
  });

  const { authStatus } = useAuthenticator((context) => [context.user]);
  const [query, setQuery] = useState("");

  const theme = useTheme();

  const targetBreakPoint = useMediaQuery(theme.breakpoints.down("lg"));
  const logoBreakPoint = useMediaQuery(theme.breakpoints.down("sm"));
  const currentLocation = useLocation();
  const [desiredPath, setDesiredPath] = useState(false);
  const [navItems] = useState({ "/": 0, "/about": 1, "/contact": 2 });
  const [val, setVal] = useState(navItems[currentLocation.pathname]);
  const [open, setOpen] = useState(false);

  /**
   * Effects
   */

  /**
   * This effect manages the focus on navigation bar tabs based on the current page
   */
  useEffect(() => {
    setDesiredPath(
      currentLocation.pathname === "/" ||
        currentLocation.pathname === "/about" ||
        currentLocation.pathname === "/contact"
    );
    setVal(navItems[currentLocation.pathname]);
  }, [currentLocation.pathname]);

  /**
   * Event functions for handling user interactions with navigation bar
   */
  const handleClick = (e, val) => {
    let link = val ? val : `/${e.currentTarget.id}`;
    navigate(link);
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      query !== "" && query && navigate(`/search/${query + "&page=1"}`);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (confirmed) => {
    if (confirmed) Auth.signOut();
    setOpen(false);
  };
  const handleAuth = (e) => {
    localStorage.setItem("lastPage", currentLocation.pathname);
    if (e.target.innerText === "LOGOUT") {
      handleClickOpen();
    } else if (e.target.innerText === "LOGIN") {
      navigate("/login", {
        state: {
          prevPage: currentLocation.pathname,
        },
      });
    }
  };
  return (
    <div>
      <LogOutConfirmation open={open} handleClose={handleClose} />
      <ThemeProvider theme={customeTheme}>
        <AppBar>
          <Toolbar>
            {targetBreakPoint ? (
              <>
                <HamburgerMenu />
                <Box
                  className="logo-image"
                  component="img"
                  sx={{
                    height: 40,
                    marginLeft: "auto",
                  }}
                  alt="Your logo."
                  src={logoBreakPoint ? LogoSmall : Logo}
                  onClick={(e) => handleClick(e, "/")}
                />

                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Find products"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                </Search>
                <IconButton
                  id="wishlist"
                  sx={{ marginLeft: "auto", color: "white" }}
                  onClick={handleClick}
                >
                  <FavoriteIcon />
                </IconButton>

                <IconButton
                  id="shoppingcart"
                  sx={{ color: "white" }}
                  onClick={handleClick}
                >
                  <Badge badgeContent={cartCount} color="success">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <>
                <Link to="/">
                  <Box
                    component="img"
                    sx={{
                      height: 40,
                    }}
                    alt="Your logo."
                    src={Logo}
                  />
                </Link>
                <Tabs
                  sx={{ marginLeft: "auto" }}
                  textColor="inherit"
                  value={desiredPath ? val : 3}
                  onChange={(e, value) =>
                    setVal(navItems[currentLocation.pathname])
                  }
                  indicatorColor={desiredPath ? "secondary" : ""}
                >
                  <Tab label="home" onClick={handleClick}></Tab>
                  <Tab label="ABOUT" id="about" onClick={handleClick} />
                  <Tab label="Contact" id="contact" onClick={handleClick} />
                  <Tab label="" id="" disabled={true} />
                </Tabs>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Find products"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                </Search>
                <IconButton
                  sx={{ marginLeft: "auto", color: "white" }}
                  onClick={handleClick}
                  id="wishlist"
                >
                  <FavoriteIcon />
                </IconButton>

                <IconButton
                  id="shoppingcart"
                  sx={{ color: "white" }}
                  onClick={handleClick}
                >
                  <Badge badgeContent={cartCount} color="success">
                    <ShoppingCart />
                  </Badge>
                </IconButton>

                <Button
                  variant="text"
                  sx={{ color: "white", left: 5 }}
                  color="info"
                  onClick={handleAuth}
                >
                  {authStatus === "authenticated" ? "Logout" : "Login"}
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default NavigationBar;
