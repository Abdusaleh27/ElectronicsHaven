import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./Styles/Footer.css";
const Footer = () => {
  /**
   * Hooks
   */
  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down("750"));

  /**
   *
   * manages the copyright logo and  keeps the year up to date.
   */
  function Copyright() {
    return (
      <Typography variant="body2" color="white" mt="10px">
        {"Copyright © "}
        <Link to="/">Electronics Haven</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Box
      className="main-footer"
      sx={{
        borderRadius: targetBreakPoint ? "50px 0 30px" : "70px 0 50px",
      }}
      maxWidth={2900}
    >
      <div className="row">
        <div className="col mt-4 ">
          <Typography color={"white"}>
            <Link to="/" className="footer-link">
              Home
            </Link>
          </Typography>
          <Typography color={"white"}>
            <Link to="/about" className="footer-link">
              About
            </Link>
          </Typography>
          <Typography color={"white"}>
            <Link to="/contact" className="footer-link">
              Contact Us
            </Link>
          </Typography>
          <Typography color={"white"}>
            <Link to="/shoppingcart" className="footer-link">
              Cart
            </Link>
          </Typography>
          <Typography color={"white"}>
            <Link to="/wishlist" className="footer-link">
              Favorites
            </Link>
          </Typography>
        </div>
        <div className="col mt-4">
          <a href="https://www.linkedin.com/in/ahsaleh27">
            <Typography color={"white"}>
              <LinkedInIcon />
            </Typography>
          </a>
          <Typography color={"white"}>
            <FacebookIcon />
          </Typography>
          <Typography color={"white"}>
            <InstagramIcon />
          </Typography>
          <Typography color={"white"}>
            <TwitterIcon />
          </Typography>
        </div>
      </div>
      <Copyright />
    </Box>
  );
};

export default Footer;
