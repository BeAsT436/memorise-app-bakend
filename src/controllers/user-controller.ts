import { Response, Request, RequestHandler } from "express"
import UserService from "../services/user-service"
import { IUser } from "../interfaces/IUser"
import { ParamsDictionary } from "express-serve-static-core"



interface IUserParams extends ParamsDictionary{

    id:string
}

interface IErrorResponse{
    error: string
}
export const getUserById = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params
        const user = await UserService.getUserById(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({error: "failed to fetch user"})
    }
}

export const getAllUsers = async(req: Request, res: Response)=>{
try {
    const users = await UserService.getAllUsers()
    res.json(users)
} catch (e) {
    res.status(500).json({error: "failed to fetch users"})
}} 

export const createUser:RequestHandler<unknown, IUser |IErrorResponse, IUser, unknown>=  async(req,res)=>{
    try {
        const {email,name,password}=req.body
        const newUser = UserService.createUser(
            {email,name,password,role:"user"}
        )
        res.status(201).json(await newUser)
    } catch (error) {
        res.status(500).json({error:"faild to create user"})
    }
}
export const updateUser: RequestHandler<IUserParams, IUser |IErrorResponse, IUser, unknown>= async(req, res)=>{
    try {
        const {id} = req.params
        const {name, email, password} = req.body
        const updatedUser = await UserService.updateUser(id, {name, email, password})
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({error:"faild to update user"})
    }
}
export const deleteUser: RequestHandler<IUserParams, unknown, unknown, unknown>= async(req, res)=>{
    try {
        const result = await UserService.deleteUser(req.params.id)
        if (!result){
            return res.status(404).json({error:"user not found"})
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({error:"faild to delete user"})
    }
}