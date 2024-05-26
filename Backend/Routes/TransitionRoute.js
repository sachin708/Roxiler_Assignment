const axios = require("axios");
const express = require("express");
const { UserModel } = require("../config/model");

const router = express.Router();


router.get("/", (req, res)=>{
    res.send({msg:"welcome to router"})
});


//initial data base


router.get("/initialize", async (req, res) => {
    try {
        // Fetch data from the API
        const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const data = response.data;

        await UserModel.deleteMany({}, { maxTimeMS: 30000 }); 

        // Insert new data into the database
        await UserModel.insertMany(data);
        // Send success response
        res.status(200).json({ message: "Database initialized with seed data" });
    } catch (error) {
        // Send error response
        res.status(500).json({ error: "Failed to initialize database", details: error.message });
    }
});

// List all transactions with search and pagination
router.get("/transactions", async (req, res) => {
    try {
      const { page = 1, perPage = 10, search = "", month } = req.query;
      const searchQuery = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { price: { $regex: search, $options: "i" } },
            ],
          }
        : {};
  
      const monthQuery = month
        ? { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } }
        : {};
  
      const query = { ...searchQuery, ...monthQuery };
  
      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });


module.exports = {
    router
}