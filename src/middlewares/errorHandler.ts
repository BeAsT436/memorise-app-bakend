import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'joi'

interface CustomError extends Error {
  statusCode?: number
  isJoi?: boolean
  details?: ValidationError['details']
}
export const errorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log('error:', error.isJoi)

  if (error.statusCode && error.isJoi)
    return res.status(error.statusCode).json({ message: error.message })

  if (error.isJoi)
    return res
      .status(400)
      .json({ message: error.details?.[0].message || 'validation error' })

  res.status(500).json({ message: 'Internal Server Error' })
}
