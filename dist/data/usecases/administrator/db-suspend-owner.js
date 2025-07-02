"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSuspendOwner = void 0;
class DbSuspendOwner {
    suspendOwnerRepository;
    constructor(suspendOwnerRepository) {
        this.suspendOwnerRepository = suspendOwnerRepository;
    }
    async suspendOwner(ownerId) {
        return this.suspendOwnerRepository.suspendOwner(ownerId);
    }
}
exports.DbSuspendOwner = DbSuspendOwner;
//# sourceMappingURL=db-suspend-owner.js.map