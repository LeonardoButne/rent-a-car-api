"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbUpdateSubscription = void 0;
class DbUpdateSubscription {
    updateSubscriptionRepository;
    constructor(updateSubscriptionRepository) {
        this.updateSubscriptionRepository = updateSubscriptionRepository;
    }
    async update(ownerId, data) {
        return this.updateSubscriptionRepository.update(ownerId, data);
    }
}
exports.DbUpdateSubscription = DbUpdateSubscription;
//# sourceMappingURL=db-update-subscription.js.map