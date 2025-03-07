import Memory, { IMemory } from '../models/memory-model'

interface IErrorResponce {
  error: string
}

class MemoryService {
  public async createMemory(
    memoryData: Omit<IMemory, 'createdAt' | 'updetedAt' | 'id'>,
  ): Promise<IMemory | IErrorResponce> {
    try {
      const newMemory = new Memory(memoryData)

      await newMemory.save()
      return { ...newMemory.toObject(), id: newMemory._id } as IMemory
    } catch (error) {
      // return {error:"failed to create memory"}
      throw new Error('failed to create memory')
    }
  }

  public async getAllMemories() {
    try {
      return Memory.find({ local: 'public' }).lean().exec()
    } catch (error) {
      throw new Error('failed to fetch memories')
    }
  }

  public async getMyMemories(userId: string) {
    try {
      return await Memory.find({ userId }).lean().exec()
    } catch (error) {
      throw new Error('failed to fetch your memories')
    }
  }

  public async getMemoryById(userId: string, id: string) {
    try {
      return await Memory.findOne({
        _id: id,
        $or: [{ userId }, { local: 'public' }],
      })
    } catch (error) {
      throw new Error('failed to fetch memory')
    }
  }
}
export default new MemoryService()
