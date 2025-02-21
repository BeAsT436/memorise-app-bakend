import Memory, { IMemory } from "../models/memory-model";

interface IErrorResponce{
    error:string
}

class MemoryService{
    public async createMemory(memoryData:Omit<IMemory, "createdAt"|"updetedAt"|"id">):Promise<IMemory | IErrorResponce>{
        try {
            
            const newMemory = new Memory(memoryData)
            
            await newMemory.save()
            return {...newMemory.toObject(),id:newMemory._id} as IMemory
        } catch (error) {
            // return {error:"failed to create memory"}
            throw new Error("failed to create memory")
        }
    }
}
export default new MemoryService()