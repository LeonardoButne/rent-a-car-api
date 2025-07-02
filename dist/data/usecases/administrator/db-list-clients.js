"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbListClients = void 0;
class DbListClients {
    listClientsRepository;
    constructor(listClientsRepository) {
        this.listClientsRepository = listClientsRepository;
    }
    async listClients() {
        return this.listClientsRepository.listClients();
    }
}
exports.DbListClients = DbListClients;
//# sourceMappingURL=db-list-clients.js.map