import { Request, Response } from "express";
import { authService } from "../services/auth-service";
export const register = async(req: Request, res: Response)=>{
    try {
        const user = await authService.register(req.body)
        res.status(201).json({message:"user was created successfully", user})
    } catch (error) {
        res.status(500).json({message:"failed to create user"})
    }
}