import { RequestHandler, Response } from 'express'
import { CustomRequest } from '../types/express'
import MemoryService from '../services/memory-service'

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
    const memory = await MemoryService.createMemory({
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

export const getAllMemories = async (_req: CustomRequest, res: Response) => {
  try {
    const memories = await MemoryService.getAllMemories()
    res.status(200).json(memories)
  } catch (_error) {
    throw new Error('failed to fetch memories')
  }
}

export const getMyMemories = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req
    const memories = await MemoryService.getMyMemories(userId)
    res.status(200).json(memories)
  } catch (_error) {
    throw new Error('failed to fetch your memories')
  }
}

export const getMemoryById = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req
    const { id } = req.params
    const memory = await MemoryService.getMemoryById(userId, id)
    res.status(200).json(memory)
  } catch (_error) {
    throw new Error('failed to fetch memory')
  }
}
export const deleteMemoryById = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req
    const { id } = req.params
    const memory = await MemoryService.deleteMemoryById(userId, id)
    res.status(200).json(memory)
  } catch (_error) {
    throw new Error('failed delete memory')
  }
}
export const updateMemory = async (req: CustomRequest, res: Response) => {
  try {
    const { userId, body } = req
    const { id } = req.params

    const memory = await MemoryService.updateMemory(userId, id, body)
    res.status(200).json(memory)
  } catch (_error) {
    throw new Error('failed update memory')
  }
}
