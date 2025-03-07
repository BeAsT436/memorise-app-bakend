import { RequestHandler, Response } from 'express'
import { CustomRequest } from '../types/express'
import memoryService from '../services/memory-service'

export const createMemory: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const { title, desc, img, local } = req.body
    const { userId } = req
    if (!userId) {
      return res.status(400).json({ error: 'userId is missing' })
    }
    const memory = await memoryService.createMemory({
      title,
      desc,
      img,
      local,
      userId,
    })
    res.status(201).json(memory)
  } catch (error) {
    res.status(500).json({ error })
    throw new Error('failed to create memory')
  }
}

export const getAllMemories = async (req: CustomRequest, res: Response) => {
  try {
    const memories = await memoryService.getAllMemories()
    res.status(200).json(memories)
  } catch (error) {
    throw new Error('failed to fetch memories')
  }
}

export const getMyMemories = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req
    const memories = await memoryService.getMyMemories(userId)
    res.status(200).json(memories)
  } catch (error) {
    throw new Error('failed to fetch your memories')
  }
}

export const getMemoryById = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req
    const { id } = req.params
    const memory = await memoryService.getMemoryById(userId, id)
    res.status(200).json(memory)
  } catch (error) {
    throw new Error('failed to fetch memory')
  }
}
