import Memory, { IMemory } from '../models/memory-model'

interface IErrorResponce {
  error: string
}
type UpdateMemoryDTO = Partial<
  Omit<IMemory, 'createdAt' | 'updetedAt' | 'id' | 'userId'>
>

class MemoryService {
  public async createMemory(
    memoryData: Omit<IMemory, 'createdAt' | 'updetedAt' | 'id'>,
  ): Promise<IMemory | IErrorResponce> {
    try {
      const newMemory = new Memory(memoryData)

      await newMemory.save()
      // remove _id, __v
      return { ...newMemory.toObject(), id: newMemory._id } as IMemory
    } catch (_error) {
      // return {error:"failed to create memory"}
      throw new Error('failed to create memory')
    }
  }

  public async getAllMemories() {
    try {
      return Memory.find({ local: 'public' }).lean().exec()
    } catch (_error) {
      throw new Error('failed to fetch memories')
    }
  }

  public async getMyMemories(userId: string) {
    try {
      const memories = await Memory.find({ userId }).lean().exec()
      
      return memories
    } catch (_error) {
      throw new Error('failed to fetch your memories')
    }
  }

  public async getMemoryById(userId: string, id: string) {
    try {
      return await Memory.findOne({
        _id: id,
        $or: [{ userId }, { local: 'public' }],
      })
    } catch (_error) {
      throw new Error('failed to fetch memory')
    }
  }

  public async deleteMemoryById(userId: string, id: string) {
    try {
      const deletedMemory = await Memory.deleteOne({
        _id: id,
        $and: [{ userId }],
      })
      if(deletedMemory.deletedCount === 0){
        return {message:"can't delete this memory"}
        
      }
      return deletedMemory
    } catch (_error) {
      throw new Error('failed to delete memory')
    }
  }

  public async updateMemory(
    userId: string,
    id: string,
    memoryData: UpdateMemoryDTO,
  ): Promise<IMemory> {
    try {
      const memoryToUpdate = await Memory.findById({
        _id: id,
        userId,
      })
      
      if (!memoryToUpdate) {
        throw new Error('memory not exist')
      }
      const memory = await Memory.findByIdAndUpdate(id, memoryData)
      if (!memory){
        throw new Error('failed to update memory') 
      }
      const updatedMemory = await Memory.findById(id)
      return updatedMemory as IMemory
    } catch (_error) {
      throw new Error('failed to update memory')
    }
  }
}

export default new MemoryService()
