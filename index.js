const express=require("express");
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 4000

//MiddleWare
app.use(express.json());

require("./config/database").connect();

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`);
})