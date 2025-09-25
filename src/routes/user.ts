import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  subscribeUser,
  updateUser,
  unsubscribeUser,
} from '../controllers/user-controller'
import { validateRequests } from '../middlewares/validate-request'
import { createUserSchema, updateUserSchema } from '../dtos/UserDTO'
import { auth } from '../middlewares/auth'
import { Permission } from '../interfaces/roles'
import { verify } from '../middlewares/verify'

const router = Router()

// api/users
router.get('/:id', getUserById)
router.get('/', verify, auth([Permission.Read]), getAllUsers)
router.post('/', validateRequests(createUserSchema), createUser)
router.post('/subscribe/:id', verify, auth([Permission.Update]), subscribeUser)
router.delete('/unsubscribe/:id', verify, auth([Permission.Update]), unsubscribeUser)
router.put('/:id', validateRequests(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router
