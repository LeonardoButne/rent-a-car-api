"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbLoadUserByToken = void 0;
class DbLoadUserByToken {
    decrypter;
    loadUserByTokenRepository;
    constructor(decrypter, loadUserByTokenRepository) {
        this.decrypter = decrypter;
        this.loadUserByTokenRepository = loadUserByTokenRepository;
    }
    async loadClientById(accesstoken, role) {
        const token = await this.decrypter.decrypt(accesstoken);
        if (token) {
            const user = await this.loadUserByTokenRepository.loadClientById(`${token.sub}`, role);
            if (user) {
                return user;
            }
        }
        return null;
    }
}
exports.DbLoadUserByToken = DbLoadUserByToken;
//# sourceMappingURL=db-load-client-by-token.js.map