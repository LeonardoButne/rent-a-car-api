"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetSubscriptionByOwner = void 0;
class DbGetSubscriptionByOwner {
    getSubscriptionByOwnerRepository;
    constructor(getSubscriptionByOwnerRepository) {
        this.getSubscriptionByOwnerRepository = getSubscriptionByOwnerRepository;
    }
    async getByOwnerId(ownerId) {
        return this.getSubscriptionByOwnerRepository.getByOwnerId(ownerId);
    }
}
exports.DbGetSubscriptionByOwner = DbGetSubscriptionByOwner;
//# sourceMappingURL=db-get-subscription-by-owner.js.map