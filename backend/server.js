const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json())
app.use(cors({ credentials: true, origin: true, credentials: true }));

// Account & User Profile
app.use("/api/account", require("./routes/account.route"))
app.use("/api/user-profile", require("./routes/userProfile.route"))

// Product
app.use("/api/product", require("./routes/product.route"))

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})