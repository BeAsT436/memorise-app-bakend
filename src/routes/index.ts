import express from 'express'
import userRouter from './user'
import authRouter from './auth'
import memoryRouter from './memory'
const router = express.Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/memory', memoryRouter)

export default router
