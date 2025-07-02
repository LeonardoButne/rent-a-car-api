"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccountClientByIdController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class GetAccountClientByIdController {
    validation;
    getAccountUser;
    constructor(validation, getAccountUser) {
        this.validation = validation;
        this.getAccountUser = getAccountUser;
    }
    async handle(httpRequest) {
        const error = this.validation.validate(httpRequest);
        if (error) {
            return (0, http_helpers_1.badRequest)(error);
        }
        const userId = httpRequest.token?.sub;
        if (!userId) {
            return (0, http_helpers_1.badRequest)(new Error('Id não localizado'));
        }
        const account = await this.getAccountUser.getAccountById(userId);
        if (!account) {
            return (0, http_helpers_1.badRequest)(new Error('Conta não localizada'));
        }
        return (0, http_helpers_1.ok)(account);
    }
}
exports.GetAccountClientByIdController = GetAccountClientByIdController;
//# sourceMappingURL=get-account-client-controller.js.map