const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const app = express();
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf.toString();
    },
  })
);
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//stripe payment
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3000";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/stripepayment", async function (req, res) {
  console.log(req);

  const params = {
    submit_type: "pay",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: req.body.cartItems.map((item) => {
      const img = item.image;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [img],
          },
          unit_amount: (100 * Math.round(item.salePrice * 100)) / 100,
        },
        tax_rates: ["txr_1O3IOOAhQ7uFDKJ4PqGOv9ww"],
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    // automatic_tax: {
    //   enabled: true,
    // },
    success_url: `${YOUR_DOMAIN}/success-page?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/shoppingcart`,
  };
  try {
    const session = await stripe.checkout.sessions.create(params);
    const { id, status, payment_status, expires_at, created } = session;
    res.json({ id, status, payment_status, expires_at, created });
  } catch (error) {
    res.json(error);
  }
});

app.get("/stripepayment", async function (req, res) {
  // Add your code here
  console.log("GET res", req.query);
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.json(session);
  } catch (error) {
    res.json(error);
  }
});
module.exports = app;
