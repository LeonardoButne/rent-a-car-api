"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupOwnerController = void 0;
const http_helpers_1 = require("../../../apresentation/helpers/http-helpers");
class SignupOwnerController {
    validation;
    signupOwner;
    constructor(validation, signupOwner) {
        this.validation = validation;
        this.signupOwner = signupOwner;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            const { name, email, password, lastName, telephone, address, subscriptionPackage, packageExpiresAt, typeAccount, statusAccount } = httpRequest.body;
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const add = await this.signupOwner.add({
                name,
                lastName,
                telephone,
                email,
                password,
                address,
                subscriptionPackage,
                packageExpiresAt,
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
exports.SignupOwnerController = SignupOwnerController;
//# sourceMappingURL=signup-owner-controller.js.map