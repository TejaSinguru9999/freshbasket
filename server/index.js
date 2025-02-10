import dotenv from 'dotenv'
import express from "express"
import connectDb from './db/connect.js';
import cors from "cors";

import UserRouter from './routers/user.js';
import ProductRouter from './routers/product.js';

dotenv.config()

const server = express();
server.use(cors({
    origin:"*",
    credentials:true,
    methods:"GET,POST",
    allowedHeaders:"Content-Type, Authorization",
}))
server.use(express.json({limit:'50mb'}))
server.use(express.urlencoded({limit:'50mb',extended:true}))

server.use("/api/v1/users",UserRouter);
server.use("/api/v1/products",ProductRouter);

connectDb().then(() => {
    server.listen(process.env.PORT||8080, () => {
        console.log("Server is running")
    })
}).catch((error)=>{
    console.log("Error: ",error)
})


