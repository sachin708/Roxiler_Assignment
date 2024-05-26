
const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://sachinpmohite2298:sachin@cluster0.zhy9hsr.mongodb.net/RoxilerSystsem?retryWrites=true&w=majority&appName=Cluster0");


module.exports = {
    connection
}