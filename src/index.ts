import express, { Router } from "express"
import {Config} from "./config"
import { connectDB } from "./db"

const app = express()
app.use(express.json())
connectDB()


const router = Router()
router.get("/",(rec,res)=>{res.json([])})

app.use(router)

app.listen(Config.PORT, ()=>{console.log("server runing on port 3001")})