import { badRequest, ok, serverError, unAuthorizedError } from '../../../../apresentation/helpers/http-helpers'

import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'
import { Authenticate } from '../../../../domain/usecases/user-usecases/authenticate-user-usecase'
import { GetAccountUserByEmailRepository } from '../../../../data/protocols/db/repository/user'
import { Payload } from '../../../protocols/payload'
import { GenerateToken } from '../../../../data/protocols/cryptography/generate-token'

export class LoginUserController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly authenticate: Authenticate,
        private readonly getAccountUserByEmailRepository: GetAccountUserByEmailRepository,
        private readonly generateToken: GenerateToken,
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest)
            const { value, password } = httpRequest.body

            if (error) {
                return badRequest(error)
            }

            const login = await this.authenticate.auth({ value, password })

            if (login === false) {
                return unAuthorizedError('Conta Inactiva')
            }

            if (login === null) {
                return unAuthorizedError(`Credenciais Inválidas`)
            }

            const account =
            await this.getAccountUserByEmailRepository.getAccountByEmail(value)

            if (!account) {
                return unAuthorizedError('Conta não encontrada')
            }

             const payload: Payload = {
                        iss: 'www.ebook',
                        aud: 'E-book Unitec',
                        sub: account.id,
                        statusAccount: account.statusAccount,
                        email: account.email,
            }

            const token = this.generateToken.token(payload) 
            return ok({token})

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
