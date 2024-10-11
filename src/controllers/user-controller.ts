import { Response, Request, RequestHandler } from "express"
import UserService from "../services/user-service"
import { IUser } from "../interfaces/IUser"

interface IErrorResponce{
    error: string
}

export const getAllUsers = async(req: Request, res: Response)=>{
try {
    const users = await UserService.getAllUsers()
    res.json(users)
} catch (e) {
    res.status(500).json({error: "failed to fetch users"})
}} 

export const createUser:RequestHandler<unknown, IUser |IErrorResponce, IUser, unknown>=  async(req,res)=>{
    try {
        const {email,name,password}=req.body
        const newUser = UserService.createUser(
            {email,name,password}
        )
        res.status(201).json(await newUser)
    } catch (error) {
        res.status(500).json({error:"faild to create user"})
    }
}