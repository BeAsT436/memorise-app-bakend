import { RequestHandler, Response } from "express"
import { CustomRequest } from "../types/express"

export const createMemory:RequestHandler = async(req:CustomRequest,res:Response)=>{
    try {
        const {title, desc, img, local} = req.body
        const {userId} = req
        if(!userId){
            return res.status(400).json({error:"userId is missing"})
        }
        await memoryService.createMemory({title, desc, img, local, userId})
    } catch (error) {
        
    }
}