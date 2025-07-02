"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDeleteOwner = void 0;
class DbDeleteOwner {
    deleteOwnerRepository;
    constructor(deleteOwnerRepository) {
        this.deleteOwnerRepository = deleteOwnerRepository;
    }
    async deleteOwner(ownerId) {
        return this.deleteOwnerRepository.deleteOwner(ownerId);
    }
}
exports.DbDeleteOwner = DbDeleteOwner;
//# sourceMappingURL=db-delete-owner.js.map