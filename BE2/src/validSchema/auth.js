import Joi from "joi";

export const registerSchema = Joi.object({
<<<<<<< HEAD
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().optional(),
  role: Joi.string().valid("admin", "member").default("member"),
=======
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống!",
    "string.email": "Email không đúng định dạng!",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Password không được để trống!",
    "string.min": "Password phải có ít nhất 6 ký tự!",
    "string.max": "Password không được quá 255 ký tự!",
  }),
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống!",
    "string.email": "Email không đúng định dạng!",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Password không được để trống!",
    "string.min": "Password phải có ít nhất 6 ký tự!",
    "string.max": "Password không được quá 255 ký tự!",
  }),
});
