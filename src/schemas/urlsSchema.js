import Joi from "joi";

const urlsSchema = Joi.object({
  url: Joi.string().uri().min(1).required().trim(),
});

export { urlsSchema };
