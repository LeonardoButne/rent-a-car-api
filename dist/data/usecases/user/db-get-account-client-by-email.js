"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetAccountUserByEmail = void 0;
class DbGetAccountUserByEmail {
    getAccountUserbyEmailRepository;
    constructor(getAccountUserbyEmailRepository) {
        this.getAccountUserbyEmailRepository = getAccountUserbyEmailRepository;
    }
    async getAccountClientbyEmail(email) {
        const account = await this.getAccountUserbyEmailRepository.getAccountByEmail(email);
        if (!account) {
            return null;
        }
        return account;
    }
}
exports.DbGetAccountUserByEmail = DbGetAccountUserByEmail;
//# sourceMappingURL=db-get-account-client-by-email.js.map