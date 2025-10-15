import Joi from "joi"

export const taskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
  }),
  description: Joi.string().allow("").max(255),
  status: Joi.string().valid("todo", "in-progress", "done").default("todo"),
  user_id: Joi.number().integer().required().messages({
  }),
  board_id: Joi.number().integer().required().messages({
  }),
})
