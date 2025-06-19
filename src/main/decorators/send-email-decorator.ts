import 'dotenv/config'
import { Controller } from '../../apresentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../apresentation/protocols/http'
import { globalConfig } from '../../config/value'
import { SendEmail } from '../../apresentation/protocols/send-email'

export class SendEmailSignupClientDecorator implements Controller {
    constructor(
        private readonly controller: Controller,
        private readonly sendEmail: SendEmail,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(httpRequest)

        if (httpResponse.statusCode === 200) {
            const body = {
                subject: 'Código OTP para login',
                messege: `Por favor, insira o código OTP: <h1>${globalConfig.saveData} </h1> no campo correspondente para continuar o login.`,
            }

            this.sendEmail.send(
                body.subject,
                httpResponse.body.email,
                process.env.EMAIL_SUPORT,
                process.env.PASS_SUPORT,
                body.messege,
            )
        }

        if (httpResponse.statusCode === 250) {
            const body = {
                subject: 'Código de verificação OTP',
                messege: `Por favor, insira o código OTP: <h1>${globalConfig.saveData} </h1> no campo correspondente para continuar.`,
            }

            this.sendEmail.send(
                body.subject,
                httpResponse.body.email,
                process.env.EMAIL_SUPORT,
                process.env.PASS_SUPORT,
                body.messege,
            )
        }

        if (httpResponse.statusCode === 201) {
            const body = {
                subject: 'Conta do usuário criada com sucesso',
                messege: `Por favor, insira o código OTP: <h1>${globalConfig.saveData} </h1> para activar a sua conta e concluir o processo de registo.`,
            }
            this.sendEmail.send(
                body.subject,
                httpResponse.body.email,
                process.env.EMAIL_SUPORT,
                process.env.PASS_SUPORT,
                body.messege,
            )
        }

        return httpResponse
    }
}
