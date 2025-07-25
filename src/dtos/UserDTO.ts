import Joi from 'joi'

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().optional().uri()
})
export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  avatar: Joi.string().optional().uri()
})
