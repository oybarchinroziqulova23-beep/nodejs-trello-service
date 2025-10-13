import Joi from "joi";

export const userValidation = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Foydalanuvchi nomi bosh bolmasligi kerak",
    "string.min": "Foydalanuvchi nomi kamida 3 ta belgidan iborat bolishi kerak",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email notogri formatda",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Parol kamida 6 ta belgidan iborat bolishi kerak",
  }),
});
