import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
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
            marginBottom={"20px"}
            sx={{ fontSize: "20px", color: "brown", fontWeight: "bold" }}
          >
            About me (
            <Link
              to="https://www.linkedin.com/in/ahsaleh27/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            )
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
              gained expertise in HTML, CSS, JavaScriptand React.
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              textAlign={"start"}
              marginBottom={"20px"}
              sx={{ fontSize: "17px" }}
            >
              I'm eager to bring my problem-solving mindset and front-end
              development skills to a team to create dynamic, user friendly and
              impactful web applications.
            </Typography>
            <Typography
              variant="subtitle2"
              marginBottom={"20px"}
              sx={{ fontSize: "20px", color: "brown", fontWeight: "bold" }}
            >
              About the project (
              <Link
                to="https://github.com/Abdusaleh27/ElectronicsHaven"
                target="_blank"
                rel="noopener noreferrer"
              >
                GIT
              </Link>
              )
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
            <h5>Let's innovate together!</h5>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default About;
