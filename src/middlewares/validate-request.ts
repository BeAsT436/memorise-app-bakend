import { ObjectSchema } from 'joi'
import { Request, Response, NextFunction } from 'express'
export const validateRequests = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).json({ error: error.details[0].message })
    }
    next()
  }
}
