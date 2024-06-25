import Joi from "joi";
import { UserRoleEnum } from "../../interfaces";

const registerValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(UserRoleEnum))
    .required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerValidation, loginValidation };
