import { badRequest, created, serverError } from '../../../apresentation/helpers/http-helpers'
import { SignupOwner } from '../../../domain/usecases/owner-usecases/signup-owner-usecase'

import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class SignupOwnerController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly signupOwner: SignupOwner,
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest)
            const { name, email, password, lastName, telephone, address, subscriptionPackage, packageExpiresAt, typeAccount, statusAccount } = httpRequest.body

            if (error) {                
                return badRequest(error)
            }

            const add = await this.signupOwner.add({
                name,
                lastName,
                telephone,
                email,
                password,
                address,
                subscriptionPackage,
                packageExpiresAt,
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