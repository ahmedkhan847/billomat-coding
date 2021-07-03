import { ValidationError, ValidationErrorItem } from "joi"
const resultResponse = { status: true, data: {}, errors: {} }

export const returnError = (error: any) => {
  resultResponse.status = false
  resultResponse.errors = error
  return resultResponse
}

export const returnSuccess = (data: any) => {
  resultResponse.data = data
  return resultResponse
}
export const extractError = (validateErrors: ValidationError) => {
  const errors: any = {}
  validateErrors.details.forEach((detail: ValidationErrorItem) => {
    errors[detail.context.key] = detail.message.replace(/\"/g, "")
  })
  return errors
}
