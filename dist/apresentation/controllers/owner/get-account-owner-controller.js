"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccountOwnerByIdController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class GetAccountOwnerByIdController {
    validation;
    getAccountOwner;
    constructor(validation, getAccountOwner) {
        this.validation = validation;
        this.getAccountOwner = getAccountOwner;
    }
    async handle(httpRequest) {
        const error = this.validation.validate(httpRequest);
        if (error) {
            return (0, http_helpers_1.badRequest)(error);
        }
        const ownerId = httpRequest.token?.sub;
        if (!ownerId) {
            return (0, http_helpers_1.badRequest)(new Error('Id não localizado'));
        }
        const account = await this.getAccountOwner.getAccountById(ownerId);
        if (!account) {
            return (0, http_helpers_1.badRequest)(new Error('Conta não localizada'));
        }
        return (0, http_helpers_1.ok)(account);
    }
}
exports.GetAccountOwnerByIdController = GetAccountOwnerByIdController;
//# sourceMappingURL=get-account-owner-controller.js.map