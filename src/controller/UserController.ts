import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import {
  UserCreateValidation,
  UserUpdateValidation
} from "../entity/UserValidation"
import * as ResponseHelper from "../helpers/response_helpers"
import { getManager } from "typeorm"

export class UserController {
  private userRepository = getRepository(User)

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.userRepository.find()
      return ResponseHelper.returnSuccess({ users })
    } catch (error) {
      return ResponseHelper.returnError(error)
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.findOne(request.params.id)
      return ResponseHelper.returnSuccess({ user })
    } catch (error) {
      return ResponseHelper.returnError(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.findOne(request.params.id)
      if (request.file) request.body.image = request.file.path
      const value = await UserUpdateValidation.validate(request.body, {
        abortEarly: false
      })
      if (value.error)
        return ResponseHelper.returnError(
          ResponseHelper.extractError(value.error)
        )

      const updatedUser = await this.userRepository.save({
        ...user,
        ...value.value
      })
      return ResponseHelper.returnSuccess({ user: updatedUser })
    } catch (error) {
      return ResponseHelper.returnError(error)
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.file) request.body.image = request.file.path
      const value = await UserCreateValidation.validate(request.body, {
        abortEarly: false
      })
      if (value.error)
        return ResponseHelper.returnError(
          ResponseHelper.extractError(value.error)
        )

      const user = await this.userRepository.save(value.value)
      return ResponseHelper.returnSuccess({ user })
    } catch (error) {
      return ResponseHelper.returnError(error)
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const userToRemove = await this.userRepository.findOne(request.params.id)
      await this.userRepository.remove(userToRemove)
      return ResponseHelper.returnSuccess({})
    } catch (error) {
      return ResponseHelper.returnError(error)
    }
  }

  async averageAge(request: Request, response: Response, next: NextFunction) {
    try {
      const entityManager = getManager()
      const averageUserAge = await entityManager.query(
        "SELECT AVG(age) as average_age from user"
      )

      return ResponseHelper.returnSuccess({
        averageUserAge: averageUserAge[0].average_age
      })
    } catch (error) {
      return ResponseHelper.returnError(error)
    }
  }
}
