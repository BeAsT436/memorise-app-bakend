import { Response, Request } from "express"
import UserService from "../services/user-service"

export const getAllUsers = async(req: Request, res: Response)=>{
try {
    const users = UserService.getAllUsers()
    res.json(users)
} catch (e) {
    res.status(500).json({error: "failed to fetch users"})
}} 