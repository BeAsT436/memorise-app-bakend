import { validateRequests } from './../middlewares/validate-request'
import { Router } from 'express'
import {
  createMemory,
  getAllMemories,
  getMemoryById,
  getMyMemories,
  deleteMemoryById,
  updateMemory,
} from '../controllers/memory-controller'
import { verify } from '../middlewares/verify'
import { createMemorySchema } from '../dtos/MemoryDTO'
import { auth } from '../middlewares/auth'
import { Permission } from '../interfaces/roles'

const router = Router()

router.post(
  '/',
  verify,
  auth([Permission.Write]),
  validateRequests(createMemorySchema),
  createMemory,
)
router.get('/', verify, auth([Permission.Read]), getAllMemories)
router.get('/me', verify, auth([Permission.Read]), getMyMemories)
router.get('/:id', verify, auth([Permission.Read]), getMemoryById)
router.delete('/:id',verify, auth([Permission.Delete]), deleteMemoryById)
router.put('/:id', verify, auth([Permission.Update]),updateMemory)
export default router
