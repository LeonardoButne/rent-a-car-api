"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupAdministratorController = void 0;
const http_helpers_1 = require("../../../apresentation/helpers/http-helpers");
class SignupAdministratorController {
    validation;
    signupAdministrator;
    constructor(validation, signupAdministrator) {
        this.validation = validation;
        this.signupAdministrator = signupAdministrator;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            const { userName, email, password, typeAccount, statusAccount } = httpRequest.body;
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const add = await this.signupAdministrator.add({
                userName,
                email,
                password,
                typeAccount,
                statusAccount,
            });
            return (0, http_helpers_1.created)(add);
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
exports.SignupAdministratorController = SignupAdministratorController;
//# sourceMappingURL=signup-administrator-controller.js.map