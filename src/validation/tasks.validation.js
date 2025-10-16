import Joi from "joi"

export const taskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
  }),
  description: Joi.string().allow("").max(255),
  status: Joi.string().valid("pending", "in-progress", "completed").default("pending"),
  user_id: Joi.string().uuid().required().messages({
  }),
  board_id: Joi.string().uuid().required().messages({
  }),
})
