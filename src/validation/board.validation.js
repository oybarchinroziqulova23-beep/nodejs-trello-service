import Joi from "joi"

export const boardValidation = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
  }),
  description: Joi.string().allow("").max(255),
  user_id: Joi.number().integer().required().messages({
  }),
})
