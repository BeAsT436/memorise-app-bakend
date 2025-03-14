import Joi from 'joi'

export const createMemorySchema = Joi.object({
  title: Joi.string().min(3).max(32).required(),
  desc: Joi.string().required().min(3).max(1000),
  local:Joi.string().optional(), 
  img: Joi.string().optional(),
})
