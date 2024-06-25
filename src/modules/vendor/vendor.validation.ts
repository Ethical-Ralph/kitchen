import Joi from "joi";

const onboardingValidation = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  contactEmail: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
});

const productValidation = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  stockQuantity: Joi.number().required(),
});

export { onboardingValidation, productValidation };
