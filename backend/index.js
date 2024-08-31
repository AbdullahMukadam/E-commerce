import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import ConnectToDb from "./config/Db.js"
import UserRoutes from "./routes/UserRoutes.js"

dotenv.config();
const port = process.env.PORT;

ConnectToDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/user",UserRoutes)

app.listen(port , ()=> console.log("started server"))



