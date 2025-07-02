"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOTPUserController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class ResendOTPUserController {
    validation;
    resendOtpUser;
    constructor(validation, resendOtpUser) {
        this.validation = validation;
        this.resendOtpUser = resendOtpUser;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            const { email } = httpRequest.body;
            if (!email) {
                return (0, http_helpers_1.badRequest)(new Error('Email obrigatorio'));
            }
            this.resendOtpUser.send(email);
            const otp = await this.resendOtpUser.send(email);
            if (otp === null) {
                return (0, http_helpers_1.badRequest)(new Error('Email nao localizado'));
            }
            if (!otp) {
                return (0, http_helpers_1.badRequest)(new Error('OTP nao gerado'));
            }
            return (0, http_helpers_1.send)(otp);
        }
        catch (error) {
            if (error.errors) {
                return (0, http_helpers_1.serverError)({
                    erro: error?.errors?.map((err) => err?.message),
                });
            }
            else {
                return (0, http_helpers_1.serverError)({ error });
            }
        }
    }
}
exports.ResendOTPUserController = ResendOTPUserController;
//# sourceMappingURL=resend-otp-client-controller.js.map