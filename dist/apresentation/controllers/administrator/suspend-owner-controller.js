"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspendOwnerController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class SuspendOwnerController {
    validation;
    suspendOwner;
    constructor(validation, suspendOwner) {
        this.validation = validation;
        this.suspendOwner = suspendOwner;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const ownerId = httpRequest.params?.ownerId;
            const result = await this.suspendOwner.suspendOwner(ownerId);
            if (!result) {
                return (0, http_helpers_1.badRequest)(new Error('Não foi possível encontrar o proprietario.'));
            }
            return (0, http_helpers_1.ok)({ suspended: true });
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
exports.SuspendOwnerController = SuspendOwnerController;
//# sourceMappingURL=suspend-owner-controller.js.map