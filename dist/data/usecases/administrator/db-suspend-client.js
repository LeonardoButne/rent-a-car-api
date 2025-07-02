"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSuspendClient = void 0;
class DbSuspendClient {
    suspendClientRepository;
    constructor(suspendClientRepository) {
        this.suspendClientRepository = suspendClientRepository;
    }
    async suspendClient(clientId) {
        return this.suspendClientRepository.suspendClient(clientId);
    }
}
exports.DbSuspendClient = DbSuspendClient;
//# sourceMappingURL=db-suspend-client.js.map