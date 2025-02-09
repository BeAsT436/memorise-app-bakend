import { NextFunction, Request, Response } from "express";
import { Permission, Role, roles } from "../interfaces/roles";
import User from "../models/user-model";
import { CustomRequest } from "../types/express";

export const auth = (requiredPermissions:Permission[])=>{
    return async (req:CustomRequest, res:Response, next:NextFunction)=>{
        try {
            const user = await User.findById(req.userId)
            // console.log(req);
            
            if(!user){
                return res.status(404).json({message:"user not found"})
            }
            const userRole = user.role as Role
            const userPermissions = roles[userRole]||[]

            const hasPermission = requiredPermissions.every((permission)=>userPermissions.includes(permission))
            if(!hasPermission){return res.status(403).json({message:"forbidden"})}
            req.userRole = userRole
            next()
        } catch (error) {
            res.status(500).json({message:"auth error"})
        }
    }
} 