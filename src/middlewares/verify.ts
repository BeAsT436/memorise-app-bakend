import  jwt  from 'jsonwebtoken';
import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/express";
import { Role } from '../interfaces/roles';


interface DecodedToken{
    userId:string
    userRole:Role
}

export const verify = (req:CustomRequest, res:Response, next:NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if(!token){
        return res.status(403).json({message:"token is not found"})
    }
    jwt.verify(token,"my secret key",(error,decoded)=>{
        if(error){
            res.status(401).json({message:"incorrect token"})
        }
        console.log(decoded);
        
        req.userId = (decoded as DecodedToken).userId
        req.userRole = (decoded as DecodedToken).userRole
    })
    next()
    
}
 
