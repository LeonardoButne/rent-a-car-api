"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetAccountOwnerById = void 0;
class DbGetAccountOwnerById {
    getAccountOwnerByIdRepository;
    constructor(getAccountOwnerByIdRepository) {
        this.getAccountOwnerByIdRepository = getAccountOwnerByIdRepository;
    }
    async getAccountById(id) {
        const account = await this.getAccountOwnerByIdRepository.getAccountById(id);
        if (!account) {
            return null;
        }
        return account;
    }
}
exports.DbGetAccountOwnerById = DbGetAccountOwnerById;
//# sourceMappingURL=db-get-account-owner-by-id.js.map