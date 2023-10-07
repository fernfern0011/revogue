const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.json())

// Account & User Profile
app.use("/api/account", require("./routes/account.route"))
app.use("/api/user-profile", require("./routes/userProfile.route"))

// Product
app.use("/api/product", require("./routes/product.route"))

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})