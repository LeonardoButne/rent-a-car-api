import { VerifyOtpLoginForUser } from '../../../../domain/usecases/user-usecases/verify-otp-login-user-usecase'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'
import { badRequest, ok, serverError } from '../../../../apresentation/helpers/http-helpers'

export class VerifyOtpLoginUserController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly verifyOtpLoginForUser: VerifyOtpLoginForUser,
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { otp, email } = httpRequest.body

            const error = this.validation.validate(httpRequest)

            if (error) {
                return badRequest(error)
            }

            const token = await this.verifyOtpLoginForUser.verify(otp, email)

            if (token === false) {
                return badRequest(new Error('Código Inválido'))
            }

            if (!token) {
                return badRequest(new Error('Email não localizdo'))
            }

            return ok({ token })
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
