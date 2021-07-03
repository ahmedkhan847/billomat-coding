import * as Joi from "joi"

export const UserValidation = Joi.object({
  name: Joi.string().required(),
  biography: Joi.string().required(),
  age: Joi.number().required(),
  image: Joi.string().default(" ")
})
