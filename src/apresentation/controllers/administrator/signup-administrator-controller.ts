import { badRequest, created, serverError } from '../../../apresentation/helpers/http-helpers'
import { SignupAdministrator } from '../../../domain/usecases/administrator-usecases/signup-administrator-usecase'

import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class SignupAdministratorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly signupAdministrator: SignupAdministrator,
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest)
            const { userName, email, password, typeAccount, statusAccount } = httpRequest.body

            if (error) {                
                return badRequest(error)
            }

            const add = await this.signupAdministrator.add({
                userName,
                email,
                password,
                typeAccount,
                statusAccount,
            })

            return created(add)
        } catch (error) {
            if (error.errors) {
                return serverError({
                    erro: error?.errors?.map((err: any) => err?.message),
                })
            } else {
                return serverError({ error })
            }
        }
    }
} 