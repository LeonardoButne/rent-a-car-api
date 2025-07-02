"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbLoadOwnerByToken = void 0;
class DbLoadOwnerByToken {
    decrypter;
    loadOwnerByTokenRepository;
    constructor(decrypter, loadOwnerByTokenRepository) {
        this.decrypter = decrypter;
        this.loadOwnerByTokenRepository = loadOwnerByTokenRepository;
    }
    async loadOwnerById(accesstoken, role) {
        const token = await this.decrypter.decrypt(accesstoken);
        if (token) {
            const owner = await this.loadOwnerByTokenRepository.loadOwnerById(`${token.sub}`, role);
            if (owner) {
                return owner;
            }
        }
        return null;
    }
}
exports.DbLoadOwnerByToken = DbLoadOwnerByToken;
//# sourceMappingURL=db-load-owner-by-token.js.map