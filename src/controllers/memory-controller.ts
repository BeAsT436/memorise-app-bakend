import { RequestHandler, Response } from "express"
import { CustomRequest } from "../types/express"
import memoryService from "../services/memory-service"

export const createMemory:RequestHandler = async(req:CustomRequest,res:Response)=>{
    try {
        const {title, desc, img, local} = req.body
        const {userId} = req 
        if(!userId){
            return res.status(400).json({error:"userId is missing"})
        }
        const memory = await memoryService.createMemory({title, desc, img, local, userId})
        res.status(201).json(memory)
    } catch (error) {
        res.status(500).json({error})
        throw new Error("failed to create memory")
    }
}