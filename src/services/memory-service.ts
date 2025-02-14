import Memory, { IMemory } from "../models/memory-model";

class MemoryService{
    public async createMemory(memoryData:Omit<IMemory, "createdAt"|"updetedAt"|"id">):Promise<IMemory>{
        try {
            const newMemory = new Memory(memoryData)
            await newMemory.save()
            return {...newMemory.toObject(),id:newMemory._id}
        } catch (error) {
            
        }
    }
}