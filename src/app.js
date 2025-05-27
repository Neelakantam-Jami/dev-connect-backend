const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/userModel");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    
    try {
        validateSignUpData(req);

        const {firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }
})

app.get("/profile",userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

app.post("/login", async (req, res) => {
    
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials..");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token =await user.getJWT();
            
            res.cookie("token", token);
            res.send("login successful");
        } else {
            throw new Error("Invalid Credentials..");
        }

    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }
})

app.get("/feed",async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong!!");
    }
})

connectDB().then(() => {
    console.log("Database Connection established successfully...");
    app.listen(7777, () => {
        console.log("Server is successfully listening to port 7777...");
    });
}).catch((err) => {
    console.log("Database connection unsuccessful!!!");
})