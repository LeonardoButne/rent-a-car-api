"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspendClientController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class SuspendClientController {
    validation;
    suspendClient;
    constructor(validation, suspendClient) {
        this.validation = validation;
        this.suspendClient = suspendClient;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const clientId = httpRequest.params?.clientId;
            if (!clientId) {
                return (0, http_helpers_1.badRequest)(new Error('clientId é obrigatório na rota.'));
            }
            const result = await this.suspendClient.suspendClient(clientId);
            if (!result) {
                return (0, http_helpers_1.badRequest)(new Error('Não foi possível encontrar o cliente.'));
            }
            return (0, http_helpers_1.ok)({ suspended: true });
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
exports.SuspendClientController = SuspendClientController;
//# sourceMappingURL=suspend-client-controller.js.map