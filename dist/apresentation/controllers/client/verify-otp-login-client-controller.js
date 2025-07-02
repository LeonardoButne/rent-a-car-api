"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtpLoginClientController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class VerifyOtpLoginClientController {
    validation;
    verifyOtpLoginForUser;
    constructor(validation, verifyOtpLoginForUser) {
        this.validation = validation;
        this.verifyOtpLoginForUser = verifyOtpLoginForUser;
    }
    async handle(httpRequest) {
        try {
            const { otp, email } = httpRequest.body;
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const token = await this.verifyOtpLoginForUser.verify(otp, email);
            if (token === false) {
                return (0, http_helpers_1.badRequest)(new Error('Código Inválido'));
            }
            if (!token) {
                return (0, http_helpers_1.badRequest)(new Error('Email não localizdo'));
            }
            return (0, http_helpers_1.ok)({ token });
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
exports.VerifyOtpLoginClientController = VerifyOtpLoginClientController;
//# sourceMappingURL=verify-otp-login-client-controller.js.map