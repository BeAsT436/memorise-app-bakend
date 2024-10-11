import { Router } from "express";
import {getAllUsers} from "../controllers/user-controller"

const router = Router()

router.get("/", getAllUsers)
// router.post("/", createUser)


export default router
