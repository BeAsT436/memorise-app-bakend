import express, { Router } from "express"
import {Config} from "./config"
import { connectDB } from "./db"
import routes from "./routes"

const app = express()

app.use(express.json())

connectDB()


app.use("/api",routes)

app.listen(Config.PORT, ()=>{console.log("server runing on port 3001")})