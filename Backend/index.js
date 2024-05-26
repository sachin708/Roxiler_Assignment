const express = require("express");
const { connection } = require("mongoose");
const { UserModel } = require("./config/db");
const { router } = require("./Routes/TransitionRoute");

const app = express();

//midddleware
app.use(express.json());

app.use("/api", router)

app.get("/", (req,res)=>{
    res.send({msg:"this is the home"})
});

app.get("/transation", async(req, res)=>{
    try{
       const user = await UserModel.find();
       res.status(200).send({user:user})
    }catch(err){
        res.status(400).send({err})
    }
});



const PORT = 8080;
app.listen(PORT, async()=>{
    try{
      await connection;
      console.log("connecting the DB");
      console.log(`server is running port ${PORT}`)
    }catch(err){
        console.log("err")
    }  
})