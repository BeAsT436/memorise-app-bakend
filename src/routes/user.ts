import { Router } from "express";
import {createUser, getAllUsers} from "../controllers/user-controller"
import { validateRequests } from "../middlewares/validate-request";
import { createUserSchema } from "../dtos/UserDTO";

const router = Router()

router.get("/", getAllUsers)
router.post("/", validateRequests(createUserSchema), createUser)


export default router
