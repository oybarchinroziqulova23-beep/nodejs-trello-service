import Joi from "../src/routes/node_modules/joi/lib";

export const userValidation = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
  }),
  email: Joi.string().email().required().messages({
  }),
  password: Joi.string().min(6).required().messages({
  }),
  age: Joi.number().min(1).optional()
})
