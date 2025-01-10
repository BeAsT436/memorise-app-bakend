import { Request, Response } from "express";
import { authService } from "../services/auth-service";

export const login = async(req: Request, res: Response)=>{
    try {
        const token =await authService.login(req.body)
        res.status(200).json({message:"user was logged in successfully", token})
    } catch (error) {
        res.status(500).json({message:"failed to log in"})
    }
}

export const register = async(req: Request, res: Response)=>{
    try {
        const token = await authService.register(req.body)
        res.status(201).json({message:"user was created successfully", token})
    } catch (error) {
        res.status(500).json({message:"failed to create user"})
    }
}