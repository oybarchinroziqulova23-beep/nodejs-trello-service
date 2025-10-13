import Joi from "joi";

export const boardValidation = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Board nomi bosh bolmasligi kerak",
  }),
  description: Joi.string().allow("").max(255),
  user_id: Joi.number().integer().required().messages({
    "number.base": "User ID raqam bo'lishi kerak",
  }),
});
