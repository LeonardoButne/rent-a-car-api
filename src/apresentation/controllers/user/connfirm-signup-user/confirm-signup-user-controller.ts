import { badRequest, noContent, ok, serverError } from '../../../../apresentation/helpers/http-helpers'
import { VerifyOtpSignupClient } from '../../../../domain/usecases/user-usecases/confirm-signup-client-usecase'
import { GetAccountClientByEmail } from '../../../../domain/usecases/user-usecases/get-account-client-by-email-usecase'
import { DataNotFoundError } from '../../../errors/data-not-found-error'

import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'


export class ConfirmSignupUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getAccountByemail: GetAccountClientByEmail,
    private readonly verifyOtpSignup: VerifyOtpSignupClient,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)

      if (error) {
        return badRequest(error)
      }

      const { email, otp } = httpRequest.body

      

      const account = await this.getAccountByemail.getAccountClientbyEmail(email)

      if (!account) {
        return badRequest(new DataNotFoundError(email))
      }

      const verify = await this.verifyOtpSignup.verify(account.secretKey, account.email, otp)

      if (!verify) {
        return badRequest(new Error('Codigo OTP não valido'))
      }

      return ok({email})
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
