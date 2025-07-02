"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmSignupAdministratorController = void 0;
const http_helpers_1 = require("../../../apresentation/helpers/http-helpers");
class ConfirmSignupAdministratorController {
    validation;
    getAccountByEmail;
    verifyOtpSignup;
    constructor(validation, getAccountByEmail, verifyOtpSignup) {
        this.validation = validation;
        this.getAccountByEmail = getAccountByEmail;
        this.verifyOtpSignup = verifyOtpSignup;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const { email, otp } = httpRequest.body;
            const account = await this.getAccountByEmail.getAccountByEmail(email);
            if (!account) {
                return (0, http_helpers_1.badRequest)(new Error('Administrador não localizado'));
            }
            const verify = await this.verifyOtpSignup.verify(account.secretKey, account.email, otp);
            if (!verify) {
                return (0, http_helpers_1.badRequest)(new Error('Codigo OTP não valido'));
            }
            return (0, http_helpers_1.ok)({ email });
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
exports.ConfirmSignupAdministratorController = ConfirmSignupAdministratorController;
//# sourceMappingURL=confirm-signup-administrator-controller.js.map