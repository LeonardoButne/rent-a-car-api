"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOwnersController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class ListOwnersController {
    validation;
    listOwners;
    constructor(validation, listOwners) {
        this.validation = validation;
        this.listOwners = listOwners;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return { statusCode: 400, body: error };
            }
            const owners = await this.listOwners.listOwners();
            return (0, http_helpers_1.ok)(owners);
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.ListOwnersController = ListOwnersController;
//# sourceMappingURL=list-owners-controller.js.map