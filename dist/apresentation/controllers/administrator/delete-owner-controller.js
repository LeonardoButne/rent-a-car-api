"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOwnerController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class DeleteOwnerController {
    validation;
    deleteOwner;
    constructor(validation, deleteOwner) {
        this.validation = validation;
        this.deleteOwner = deleteOwner;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const ownerId = httpRequest.params?.ownerId;
            const result = await this.deleteOwner.deleteOwner(ownerId);
            if (!result) {
                return (0, http_helpers_1.badRequest)(new Error('Não foi possível encontrar o proprietario.'));
            }
            return (0, http_helpers_1.ok)({ deleted: true });
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.DeleteOwnerController = DeleteOwnerController;
//# sourceMappingURL=delete-owner-controller.js.map