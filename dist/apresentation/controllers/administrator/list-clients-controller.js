"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClientsController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class ListClientsController {
    validation;
    listClients;
    constructor(validation, listClients) {
        this.validation = validation;
        this.listClients = listClients;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return { statusCode: 400, body: error };
            }
            const clients = await this.listClients.listClients();
            return (0, http_helpers_1.ok)(clients);
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.ListClientsController = ListClientsController;
//# sourceMappingURL=list-clients-controller.js.map