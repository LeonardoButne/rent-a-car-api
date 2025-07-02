"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtpLoginOwnerController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class VerifyOtpLoginOwnerController {
    validation;
    verifyOtpLoginForOwner;
    constructor(validation, verifyOtpLoginForOwner) {
        this.validation = validation;
        this.verifyOtpLoginForOwner = verifyOtpLoginForOwner;
    }
    async handle(httpRequest) {
        try {
            const { otp, email } = httpRequest.body;
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const token = await this.verifyOtpLoginForOwner.verify(otp, email);
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
exports.VerifyOtpLoginOwnerController = VerifyOtpLoginOwnerController;
//# sourceMappingURL=verify-otp-login-owner-controller.js.map