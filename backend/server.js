const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json())
app.use(cors({ credentials: true, origin: true }));

// Account & User Profile & Address
app.use("/api/account", require("./routes/account.route"))
app.use("/api/user-profile", require("./routes/userProfile.route"))
app.use("/api/address", require("./routes/address.route"))

// Product & Wishlist & Cart
app.use("/api/product", require("./routes/product.route"))
app.use("/api/wishlist", require("./routes/wishlist.route"))
app.use("/api/cart", require("./routes/cart.route"))

// My Purchases & My Sales
app.use("/api/mypurchases", require("./routes/mypurchases.route"))
app.use("/api/mysales", require("./routes/mysales.route"))

//Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//TEST
// app.get('/', (req, res) => {
//   res.send('Stripe Payment Backend');
// });

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
})