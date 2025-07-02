import { badRequest, ok, serverError } from '../../../apresentation/helpers/http-helpers'
import { VerifyOtpSignupOwner } from '../../../domain/usecases/owner-usecases/confirm-signup-owner-usecase'
import { GetAccountOwnerByEmail } from '../../../domain/usecases/owner-usecases/get-account-owner-by-email-usecase'
import { DataNotFoundError } from '../../errors/data-not-found-error'

import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class ConfirmSignupOwnerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getAccountByemail: GetAccountOwnerByEmail,
    private readonly verifyOtpSignup: VerifyOtpSignupOwner,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)

      if (error) {
        return badRequest(error)
      }

      const { email, otp } = httpRequest.body

      const account = await this.getAccountByemail.getAccountOwnerbyEmail(email)

      if (!account) {
        return badRequest(new DataNotFoundError(email))
      }

      const token = await this.verifyOtpSignup.verify(account.secretKey, account.email, otp, account)

      if (!token) {
        return badRequest(new Error('Codigo OTP não valido'))
      }

      return ok({ token, email })
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