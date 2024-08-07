import { ArrowBack, ArrowUpward } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const icon = {
    hidden: {},
    visible: {
      x: [-10, 0, 10, 0],
    },
  };
  return (
    <>
      <Box
        margin={"auto"}
        sx={{
          marginTop: "100px",
          paddingRight: "5%",
          paddingLeft: "5%",
          maxWidth: "1000px",
          marginBottom: "50px",
        }}
      >
        <Card>
          <Typography
            variant="subtitle2"
            marginTop={"25px"}
            marginBottom={"20px"}
            sx={{ fontSize: "20px", color: "#3d749b", fontWeight: "bold" }}
          >
            About me
          </Typography>

          <CardContent>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              textAlign={"start"}
              marginBottom={"5px"}
              sx={{ fontSize: "17px" }}
            >
              Hello, I'm Abdullah Saleh, I would like to thank you for your
              interest to learn more about me and my project. I am a front-end
              web developer who recently completed a very rigorous boot camp and
              gained expertise in HTML, CSS, JavaScript and React.
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              textAlign={"start"}
              marginBottom={"20px"}
              sx={{
                display: "inline-block",
                fontSize: "19px",
                fontWeight: "bold",
                color: "#055481",
                marginTop: "30px",
                marginBottom: "0",
              }}
            >
              Please visit my
              <Link
                to="https://abdullahsaleh.electronicshaven.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="special-links"> Portfolio Website</span>
              </Link>{" "}
            </Typography>
            <motion.div
              variants={icon}
              animate={{
                x: [0, 75, 75, 75, 150, 150, 75, 75, 0],
                opacity: [
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 0,
                ],
              }}
              transition={{ duration: 15, ease: "easeInOut" }}
            >
              <ArrowUpward />
            </motion.div>
           
            <Typography
              variant="subtitle2"
              marginBottom={"20px"}
              sx={{
                marginTop: "20px",
                fontSize: "20px",
                color: "#3d749b",
                fontWeight: "bold",
              }}
            >
              About the project
            </Typography>

            <ul>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "17px" }}
                >
                  Built an e-commerce platform that utilizes Best Buy's API to
                  provide real-time product listings according to user searches.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "17px" }}
                >
                  Created dynamic customer experiences by showcasing the most
                  viewed and trending products on the landing page.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "17px" }}
                >
                  Implemented many features such adding and removing products
                  from shopping cart and wish list, displaying product details,
                  search filters, and sorting search results by price or
                  customer rating.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "17px" }}
                >
                  Used React for building the front end along with Material UI
                  for a responsive, dynamic, and visually appealing website.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "17px" }}
                >
                  Used AWS Amplify functionalities such as Cognito for creating
                  and authenticating users, Graphql and DynamoDB for storing
                  customer’s data, and implemented Express RESTful APIs secured
                  by AWS IAM roles for interacting with Best Buy and Stripe APIs
                  in the back end eliminating the exposure of secret API keys.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "17px" }}
                >
                  Integrated a secure payment gateway using Stripe for a
                  seamless checkout.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "17px" }}
                >
                  Addressed Best Buy API’s product search limitations by
                  enhancing search functionality using search filters and
                  sorting options, significantly improving the accuracy of
                  search results, and enhancing the overall user’s experience.
                </Typography>
              </li>
            </ul>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              textAlign={"center"}
              sx={{
                fontSize: "17px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              <Link
                to="https://github.com/Abdusaleh27/ElectronicsHaven"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="special-links">
                  Project github repository{" "}
                </span>
              </Link>
            </Typography>
            <h5>Let's innovate together!</h5>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default About;
