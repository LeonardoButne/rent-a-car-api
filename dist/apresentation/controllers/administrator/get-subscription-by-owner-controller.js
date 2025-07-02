"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSubscriptionByOwnerController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class GetSubscriptionByOwnerController {
    validation;
    getSubscriptionByOwner;
    constructor(validation, getSubscriptionByOwner) {
        this.validation = validation;
        this.getSubscriptionByOwner = getSubscriptionByOwner;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const { ownerId } = httpRequest.params;
            const subscription = await this.getSubscriptionByOwner.getByOwnerId(ownerId);
            if (!subscription) {
                return (0, http_helpers_1.badRequest)(new Error('Subscrição não localizada.'));
            }
            return (0, http_helpers_1.ok)(subscription);
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.GetSubscriptionByOwnerController = GetSubscriptionByOwnerController;
//# sourceMappingURL=get-subscription-by-owner-controller.js.map