import Joi from 'joi'

export const createMemorySchema = Joi.object({
  title: Joi.string().min(3).max(32).required(),
  desc: Joi.string().required().min(3).max(1000),
  local:Joi.string().optional(), 
  img: Joi.string().optional(),
})
export const updateMemorySchema = Joi.object({
  title: Joi.string().min(3).max(32).optional(),
  desc: Joi.string().optional().min(3).max(1000),
  local:Joi.string().optional(), 
  img: Joi.string().optional(),
})