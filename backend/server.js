const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.json())

app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})