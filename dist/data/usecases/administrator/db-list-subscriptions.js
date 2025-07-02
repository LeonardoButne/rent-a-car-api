"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbListSubscriptions = void 0;
class DbListSubscriptions {
    listSubscriptionsRepository;
    constructor(listSubscriptionsRepository) {
        this.listSubscriptionsRepository = listSubscriptionsRepository;
    }
    async listSubscriptions() {
        return this.listSubscriptionsRepository.listSubscriptions();
    }
}
exports.DbListSubscriptions = DbListSubscriptions;
//# sourceMappingURL=db-list-subscriptions.js.map