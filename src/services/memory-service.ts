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
    if (id == undefined || !id || id == 'undefined' || id == null) {
      throw new AppError("id can't be undefined")
    }
    const memory = await Memory.findById(id)

    //todo resolve issue with error res
    if (!memory) throw new AppError('memory not found')

    await Memory.deleteOne({
      _id: id,
      $and: [{ userId }],
    }).lean()

    return { success: true }
  }

  public async updateMemory(
    userId: string,
    id: string,
    memoryData: UpdateMemoryDTO,
  ): Promise<IMemory> {
    const memoryToUpdate = await Memory.findById(id).lean()

    if (!memoryToUpdate) {
      throw new AppError('memory not exist', 404)
    }
    
    if(memoryToUpdate.userId.toString() !== userId){
      throw new AppError("access denied", 403)
    }
    
    
    const memory = await Memory.findByIdAndUpdate(
      { _id: id, userId},
      memoryData,
      { new: true },
    ).lean()
    if (!memory) {
      throw new AppError('failed to find memory', 404)
    }
    return cleanResponse(memory) as IMemory
  }
}

export default new MemoryService()
