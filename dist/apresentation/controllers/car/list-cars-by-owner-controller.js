"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCarsByOwnerController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class ListCarsByOwnerController {
    validation;
    listCarsByOwner;
    constructor(validation, listCarsByOwner) {
        this.validation = validation;
        this.listCarsByOwner = listCarsByOwner;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const ownerId = httpRequest.token?.sub;
            if (!ownerId) {
                return (0, http_helpers_1.badRequest)(new Error('Id do proprietário não localizado no token'));
            }
            const cars = await this.listCarsByOwner.listCarsByOwner(ownerId);
            return (0, http_helpers_1.ok)(cars);
        }
        catch (error) {
            if (error.errors) {
                return (0, http_helpers_1.serverError)({
                    erro: error?.errors?.map((err) => err?.message),
                });
            }
            else {
                return (0, http_helpers_1.serverError)({ error });
            }
        }
    }
}
exports.ListCarsByOwnerController = ListCarsByOwnerController;
//# sourceMappingURL=list-cars-by-owner-controller.js.map