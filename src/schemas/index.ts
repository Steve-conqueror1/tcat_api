import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("BASIC", "ADMIN", "SUPER_ADMIN").default("BASIC"),
});

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
