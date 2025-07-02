"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbListOwners = void 0;
class DbListOwners {
    listOwnersRepository;
    constructor(listOwnersRepository) {
        this.listOwnersRepository = listOwnersRepository;
    }
    async listOwners() {
        return this.listOwnersRepository.listOwners();
    }
}
exports.DbListOwners = DbListOwners;
//# sourceMappingURL=db-list-owners.js.map