"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdministratorController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class LoginAdministratorController {
    validation;
    authenticate;
    constructor(validation, authenticate) {
        this.validation = validation;
        this.authenticate = authenticate;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            const { email, password } = httpRequest.body;
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const login = await this.authenticate.auth({ email, password });
            if (login === false) {
                return (0, http_helpers_1.unAuthorizedError)('Conta Inactiva');
            }
            if (login === null) {
                return (0, http_helpers_1.unAuthorizedError)(`Credenciais Inválidas`);
            }
            return (0, http_helpers_1.ok)({ message: 'OTP enviado com sucesso', email });
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
exports.LoginAdministratorController = LoginAdministratorController;
//# sourceMappingURL=login-administrator-controller.js.map