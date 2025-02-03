import express from "express";
import dotenv from "dotenv";
dotenv.config()
import morgan from "morgan";
import connectDB from "./config/db.js";
import AuthRoute from "./routes/AuthRoute.js"
import CategoryRoutes from "./routes/CategoryRoutes.js"
import ProductRoute from "./routes/ProductRoute.js"
import cors from "cors"

const app=express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use("/api/v1/auth",AuthRoute);
app.use("/api/v1/category",CategoryRoutes)
app.use("/api/v1/product",ProductRoute)

connectDB();

app.get('/',(req,res)=>{
    res.send({message:"welcome"})
})


const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})