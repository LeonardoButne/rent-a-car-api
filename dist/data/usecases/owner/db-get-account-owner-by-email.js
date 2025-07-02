"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetAccountOwnerByEmail = void 0;
class DbGetAccountOwnerByEmail {
    getAccountOwnerByEmailRepository;
    constructor(getAccountOwnerByEmailRepository) {
        this.getAccountOwnerByEmailRepository = getAccountOwnerByEmailRepository;
    }
    async getAccountOwnerbyEmail(email) {
        const account = await this.getAccountOwnerByEmailRepository.getAccountByEmail(email);
        if (!account) {
            return null;
        }
        return account;
    }
}
exports.DbGetAccountOwnerByEmail = DbGetAccountOwnerByEmail;
//# sourceMappingURL=db-get-account-owner-by-email.js.map