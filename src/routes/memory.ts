import { validateRequests } from './../middlewares/validate-request';
import { Router } from "express";
import { createMemory } from "../controllers/memory-controller";
import { verify } from "../middlewares/verify";
import { createMemorySchema } from '../dtos/MemoryDTO';
import { auth } from '../middlewares/auth';
import { Permission } from '../interfaces/roles';


const router = Router()

router.post("/",verify,auth([Permission.Write]),validateRequests(createMemorySchema), createMemory)

export default router