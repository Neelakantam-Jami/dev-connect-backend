const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://kantesh1808:OL1EEHdpINp8ENsP@mongodata.b8qck7n.mongodb.net/devConnect");
};

module.exports = connectDB;
