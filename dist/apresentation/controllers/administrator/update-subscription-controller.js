"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubscriptionController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class UpdateSubscriptionController {
    validation;
    updateSubscription;
    constructor(validation, updateSubscription) {
        this.validation = validation;
        this.updateSubscription = updateSubscription;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const { ownerId } = httpRequest.params;
            const result = await this.updateSubscription.update(ownerId, httpRequest.body);
            if (!result) {
                return (0, http_helpers_1.badRequest)(new Error('Não foi possível atualizar a subscrição.'));
            }
            return (0, http_helpers_1.ok)({ updated: true });
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.UpdateSubscriptionController = UpdateSubscriptionController;
//# sourceMappingURL=update-subscription-controller.js.map