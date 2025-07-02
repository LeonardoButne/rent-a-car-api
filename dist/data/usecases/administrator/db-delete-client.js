"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDeleteClient = void 0;
class DbDeleteClient {
    deleteClientRepository;
    constructor(deleteClientRepository) {
        this.deleteClientRepository = deleteClientRepository;
    }
    async deleteClient(clientId) {
        return this.deleteClientRepository.deleteClient(clientId);
    }
}
exports.DbDeleteClient = DbDeleteClient;
//# sourceMappingURL=db-delete-client.js.map