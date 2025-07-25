import { Response, Request, RequestHandler } from 'express'
import UserService from '../services/user-service'
import { IUser } from '../interfaces/IUser'
import { ParamsDictionary } from 'express-serve-static-core'

interface IUserParams extends ParamsDictionary {
  id: string
}

interface IErrorResponse {
  error: string
}
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await UserService.getUserById(id)
    res.json(user)
  } catch (_error) {
    res.status(500).json({ error: 'failed to fetch user' })
  }
}

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers()
    res.json(users)
  } catch (_e) {
    res.status(500).json({ error: 'failed to fetch users' })
  }
}

export const createUser: RequestHandler<
  unknown,
  IUser | IErrorResponse,
  IUser,
  unknown
> = async (req, res) => {
  try {
    const { email, name, password, avatar } = req.body
    const newUser = UserService.createUser({
      email,
      name,
      password,
      avatar,
      role: 'user',
    })
    res.status(201).json(await newUser)
  } catch (_error) {
    res.status(500).json({ error: 'faild to create user' })
  }
}
export const updateUser: RequestHandler<
  IUserParams,
  IUser | IErrorResponse,
  IUser,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, avatar } = req.body

    
    const updatedUser = await UserService.updateUser(id, {
      name,
      email,
      password,
      avatar,
    })
    res.json(updatedUser)
  } catch (_error) {
    res.status(500).json({ error: 'faild to update user' })
  }
}
export const deleteUser: RequestHandler<
  IUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const result = await UserService.deleteUser(req.params.id)
    if (!result) {
      return res.status(404).json({ error: 'user not found' })
    }
    res.status(204).send()
  } catch (_error) {
    res.status(500).json({ error: 'faild to delete user' })
  }
}
