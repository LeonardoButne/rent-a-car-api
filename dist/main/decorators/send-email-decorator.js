"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailSignupClientDecorator = void 0;
require("dotenv/config");
const value_1 = require("../../config/value");
class SendEmailSignupClientDecorator {
    controller;
    sendEmail;
    constructor(controller, sendEmail) {
        this.controller = controller;
        this.sendEmail = sendEmail;
    }
    async handle(httpRequest) {
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            const body = {
                subject: 'Código OTP para login',
                messege: `Por favor, insira o código OTP: <h1>${value_1.globalConfig.saveData} </h1> no campo correspondente para continuar o login.`,
            };
            this.sendEmail.send(body.subject, httpResponse.body.email, process.env.EMAIL_SUPORT, process.env.PASS_SUPORT, body.messege);
        }
        if (httpResponse.statusCode === 250) {
            const body = {
                subject: 'Código de verificação OTP',
                messege: `Por favor, insira o código OTP: <h1>${value_1.globalConfig.saveData} </h1> no campo correspondente para continuar.`,
            };
            this.sendEmail.send(body.subject, httpResponse.body.email, process.env.EMAIL_SUPORT, process.env.PASS_SUPORT, body.messege);
        }
        if (httpResponse.statusCode === 201) {
            const body = {
                subject: 'Conta do usuário criada com sucesso',
                messege: `Por favor, insira o código OTP: <h1>${value_1.globalConfig.saveData} </h1> para activar a sua conta e concluir o processo de registo.`,
            };
            this.sendEmail.send(body.subject, httpResponse.body.email, process.env.EMAIL_SUPORT, process.env.PASS_SUPORT, body.messege);
        }
        return httpResponse;
    }
}
exports.SendEmailSignupClientDecorator = SendEmailSignupClientDecorator;
//# sourceMappingURL=send-email-decorator.js.map