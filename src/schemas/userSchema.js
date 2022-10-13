import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().min(1).required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(1).required().trim(),
  confirmPassword: Joi.string().min(1).required().trim(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(1).required().trim(),
});

export { signInSchema, signUpSchema };
