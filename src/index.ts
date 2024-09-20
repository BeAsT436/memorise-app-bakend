import express, { Router } from "express"

const app = express()
app.use(express.json())

const router = Router()
router.get("/",(rec,res)=>{res.json([])})

app.use(router)

app.listen(3001, ()=>{console.log("server runing on port 3001")})