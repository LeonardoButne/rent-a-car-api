"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOTPOwnerController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class ResendOTPOwnerController {
    validation;
    resendOtpOwner;
    constructor(validation, resendOtpOwner) {
        this.validation = validation;
        this.resendOtpOwner = resendOtpOwner;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            const { email } = httpRequest.body;
            if (!email) {
                return (0, http_helpers_1.badRequest)(new Error('Email obrigatorio'));
            }
            this.resendOtpOwner.send(email);
            const otp = await this.resendOtpOwner.send(email);
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
exports.ResendOTPOwnerController = ResendOTPOwnerController;
//# sourceMappingURL=resend-otp-owner-controller.js.map