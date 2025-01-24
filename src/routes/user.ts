import { Router } from "express";
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/user-controller"
import { validateRequests } from "../middlewares/validate-request";
import { createUserSchema, updateUserSchema } from "../dtos/UserDTO";
import { auth } from "../middlewares/auth";
import { Permission } from "../interfaces/roles";

const router = Router()

router.get("/:id", getUserById)
router.get("/", getAllUsers)
router.post("/", validateRequests(createUserSchema), createUser)
router.put("/:id",validateRequests(updateUserSchema), updateUser)
router.delete("/:id", deleteUser)


export default router
