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
  if (error.isJoi) {
    console.log("isjoi");
    console.log("message",error.details?.[0].message);
    
    return res.status(error.statusCode || 400).json({
      message:
        error.details?.[0].message || error.message || 'validation error',
    })
  }
  console.log("global");
  
  res.status(error.statusCode||500).json({
    
    
    message: error.details?.[0].message ||"server error"
  })
  
}
