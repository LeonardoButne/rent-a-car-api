"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmSignupOwnerController = void 0;
const http_helpers_1 = require("../../../apresentation/helpers/http-helpers");
const data_not_found_error_1 = require("../../errors/data-not-found-error");
class ConfirmSignupOwnerController {
    validation;
    getAccountByemail;
    verifyOtpSignup;
    constructor(validation, getAccountByemail, verifyOtpSignup) {
        this.validation = validation;
        this.getAccountByemail = getAccountByemail;
        this.verifyOtpSignup = verifyOtpSignup;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const { email, otp } = httpRequest.body;
            const account = await this.getAccountByemail.getAccountOwnerbyEmail(email);
            if (!account) {
                return (0, http_helpers_1.badRequest)(new data_not_found_error_1.DataNotFoundError(email));
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
exports.ConfirmSignupOwnerController = ConfirmSignupOwnerController;
//# sourceMappingURL=confirm-signup-owner-controller.js.map