"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetAccountClientById = void 0;
class DbGetAccountClientById {
    getAccountClientByIdRepository;
    constructor(getAccountClientByIdRepository) {
        this.getAccountClientByIdRepository = getAccountClientByIdRepository;
    }
    async getAccountById(id) {
        const account = await this.getAccountClientByIdRepository.getAccountById(id);
        if (!account) {
            return null;
        }
        return account;
    }
}
exports.DbGetAccountClientById = DbGetAccountClientById;
//# sourceMappingURL=db-get-account-client-by-id.js.map