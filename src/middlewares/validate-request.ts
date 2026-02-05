import { ObjectSchema } from 'joi'
import { Request, Response, NextFunction } from 'express'
export const validateRequests = (schema: ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      console.log("\"\"validate",error.details[0].message)
      error.isJoi = true
      return next(error)
    }
    next()
  }
}
