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

// Imports for Services
const fileServices = require('./services/cloudinaryFileService');

// File Services - Delete image from Cloudinary
app.delete('/services/cloudinary/delete-image', (req, res) => {
  var imagePublicId = req.body.imagePublicId;

  fileServices.deleteImage(imagePublicId, function (err, result) {
    if (!err) {
      console.log(result);
      res.status(200).send({ result: result });
    } else {
      res.status(500).send({ error: err, code: 500 });
    };
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
})