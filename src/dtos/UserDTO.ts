import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})