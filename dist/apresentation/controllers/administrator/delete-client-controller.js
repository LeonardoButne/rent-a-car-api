"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClientController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class DeleteClientController {
    validation;
    deleteClient;
    constructor(validation, deleteClient) {
        this.validation = validation;
        this.deleteClient = deleteClient;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const clientId = httpRequest.params?.clientId;
            const result = await this.deleteClient.deleteClient(clientId);
            if (!result) {
                return (0, http_helpers_1.badRequest)(new Error('Não foi possível remover o cliente.'));
            }
            return (0, http_helpers_1.ok)({ deleted: true });
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.DeleteClientController = DeleteClientController;
//# sourceMappingURL=delete-client-controller.js.map