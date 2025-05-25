const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Test page");
});

app.use("/hello", (req, res) => {
    res.send("hello page");
});

app.use("/",(req, res) => {
    res.send("Main Page");
});


app.listen(1234, () => {
    console.log("Server is successfully running on port 1234...");
});