import { Router } from "express";
import { createMemory } from "../controllers/memory-controller";

const router = Router()

router.post("/", createMemory)

export default router