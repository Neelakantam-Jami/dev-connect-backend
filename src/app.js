const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB().then(() => {
    console.log("Database Connection established successfully...");
    app.listen(7777, () => {
        console.log("Server is successfully listening to port 7777...");
    });
}).catch((err) => {
    console.log("Database connection unsuccessful!!!");
})