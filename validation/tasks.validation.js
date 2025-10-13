import Joi from "joi";

export const taskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Task nomi bo'sh bo'lmasligi kerak",
  }),
  description: Joi.string().allow("").max(255),
  status: Joi.string().valid("todo", "in-progress", "done").default("todo"),
  user_id: Joi.number().integer().required().messages({
    "number.base": "User ID raqam bo'lishi kerak",
  }),
  board_id: Joi.number().integer().required().messages({
    "number.base": "Board ID raqam bo'lishi kerak",
  }),
});
