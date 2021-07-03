import * as Joi from "joi"

export const UserCreateValidation = Joi.object({
  name: Joi.string().required(),
  biography: Joi.string().required(),
  age: Joi.number().required(),
  image: Joi.string()
})

export const UserUpdateValidation = Joi.object({
  name: Joi.string(),
  biography: Joi.string(),
  age: Joi.number(),
  image: Joi.string()
})
