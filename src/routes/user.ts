import { Router } from "express";
import {createUser, deleteUser, getAllUsers, updateUser} from "../controllers/user-controller"
import { validateRequests } from "../middlewares/validate-request";
import { createUserSchema, updateUserSchema } from "../dtos/UserDTO";

const router = Router()

router.get("/", getAllUsers)
router.post("/", validateRequests(createUserSchema), createUser)
router.put("/:id",validateRequests(updateUserSchema), updateUser)
router.delete("/:id", deleteUser)


export default router
