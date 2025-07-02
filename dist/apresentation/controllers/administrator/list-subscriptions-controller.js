"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSubscriptionsController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class ListSubscriptionsController {
    validation;
    listSubscriptions;
    constructor(validation, listSubscriptions) {
        this.validation = validation;
        this.listSubscriptions = listSubscriptions;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return { statusCode: 400, body: error };
            }
            const subscriptions = await this.listSubscriptions.listSubscriptions();
            return (0, http_helpers_1.ok)(subscriptions);
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.ListSubscriptionsController = ListSubscriptionsController;
//# sourceMappingURL=list-subscriptions-controller.js.map