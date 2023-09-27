const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.json())

app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World" });
});

// Test
app.use("/api/v1/books", require('./routes/book.route'))

// Account
app.use("/api/account", require("./routes/account.route"))

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})