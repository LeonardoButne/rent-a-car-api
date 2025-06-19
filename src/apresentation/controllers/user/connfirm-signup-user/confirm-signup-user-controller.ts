import { badRequest, noContent, serverError } from '../../../../apresentation/helpers/http-helpers'
import { DataNotFoundError } from '../../../errors/data-not-found-error'

import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'
import { VerifyOtpSignupUser } from '../../../../domain/usecases/user-usecases/confirm-signup-user-usecase'
import { GetAccountUserByEmail } from '../../../../domain/usecases/user-usecases/get-account-user-by-email-usecase'

export class ConfirmSignupUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getAccountByemail: GetAccountUserByEmail,
    private readonly verifyOtpSignup: VerifyOtpSignupUser,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)

      const { email, otp } = httpRequest.body

      if (error) {
        return badRequest(error)
      }

      const account = await this.getAccountByemail.getAccountUserbyEmail(email)

      if (!account) {
        return badRequest(new DataNotFoundError(email))
      }

      const verify = await this.verifyOtpSignup.verify(account.secretKey, account.email, otp)

      if (!verify) {
        return badRequest(new Error('Codigo OTP não valido'))
      }

      return noContent(verify)
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
