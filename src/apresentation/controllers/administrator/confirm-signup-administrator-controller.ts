import { badRequest, ok, serverError } from '../../../apresentation/helpers/http-helpers'
import { VerifyOtpSignupAdministrator } from '../../../domain/usecases/administrator-usecases/confirm-signup-administrator-usecase'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'
import { AdministratorRepository } from '../../../data/repositories/administrator-repository'

export class ConfirmSignupAdministratorController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getAccountByEmail: AdministratorRepository,
    private readonly verifyOtpSignup: VerifyOtpSignupAdministrator,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const { email, otp } = httpRequest.body
      const account = await this.getAccountByEmail.getAccountByEmail(email)
      if (!account) {
        return badRequest(new Error('Administrador não localizado'))
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