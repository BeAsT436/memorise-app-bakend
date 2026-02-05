import { AppError } from '../errors/AppError'
import Memory, { IMemory } from '../models/memory-model'
import cleanResponse from '../utils/cleanResponse'

type UpdateMemoryDTO = Partial<
  Omit<IMemory, 'createdAt' | 'updetedAt' | 'id' | 'userId'>
>
type CreateMemoryDTO = Omit<IMemory, 'createdAt' | 'updetedAt' | 'id'>

class MemoryService {
  async createMemory(memoryData: CreateMemoryDTO): Promise<IMemory> {
    const createdMemory = await Memory.create(memoryData)
    // todo resolve type for create memory instead of finding
    const memory = await Memory.findById(createdMemory.id).lean()

    if (!memory) {
      throw new AppError('memory not found', 404)
    }

    return cleanResponse(memory) as IMemory
  }

  public async getAllMemories() {
    const memories = await Memory.find({ local: 'public' }).lean()

    return cleanResponse(memories)
  }

  public async getMyMemories(userId: string) {
    const memories = await Memory.find({ userId }).lean()

    return cleanResponse(memories)
  }

  public async getMemoryById(userId: string, id: string) {
    const memory = await Memory.findOne({
      _id: id,
      $or: [{ userId }, { local: 'public' }],
    }).lean()
    if (!memory) {
      throw new AppError('memory not found', 404)
    }
    return cleanResponse(memory)
  }

  public async deleteMemoryById(userId: string, id: string) {
    
      const deletedMemory = await Memory.deleteOne({
        _id: id,
        $and: [{ userId }],
      }).lean()
      if (deletedMemory.deletedCount === 0) {
        return { message: "can't delete this memory" }
      }
      return {success:true}
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
      if (!memory) {
        throw new Error('failed to find memory')
      }
      const updatedMemory = await Memory.findById(id)
      return updatedMemory as IMemory
    } catch (_error) {
      throw new Error('failed to update memory')
    }
  }
}

export default new MemoryService()
