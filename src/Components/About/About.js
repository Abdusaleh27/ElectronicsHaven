import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

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
          <CardHeader
            color="text.primary"
            title="About Me"
            titleTypographyProps={{
              variant: "body1",
              fontWeight: "bold",
              color: "brown",
            }}
          />
          <CardContent>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              textAlign={"start"}
              marginBottom={"5px"}
              sx={{ fontSize: "20px" }}
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
              sx={{ fontSize: "20px" }}
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
              About the project
            </Typography>
            <ul>
              <li>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign={"start"}
                  sx={{ fontSize: "20px" }}
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
                  sx={{ fontSize: "20px" }}
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
                  sx={{ fontSize: "20px" }}
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
                  sx={{ fontSize: "20px" }}
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
                  sx={{ fontSize: "20px" }}
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
                  sx={{ fontSize: "20px" }}
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
                  sx={{ fontSize: "20px" }}
                >
                  Addressed Best Buy API’s product search limitations by
                  enhancing search functionality using search filters and
                  sorting options, significantly improving the accuracy of
                  search results, and enhancing the overall user’s experience.
                </Typography>
              </li>
            </ul>
            <h6>Let's innovate together!</h6>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default About;
