"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupClientController = void 0;
const http_helpers_1 = require("../../../apresentation/helpers/http-helpers");
class SignupClientController {
    validation;
    signupClient;
    constructor(validation, signupClient) {
        this.validation = validation;
        this.signupClient = signupClient;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            const { name, email, password, lastName, telephone } = httpRequest.body;
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const add = await this.signupClient.add({
                name,
                lastName,
                telephone,
                email,
                password,
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
exports.SignupClientController = SignupClientController;
//# sourceMappingURL=signup-client-controler.js.map