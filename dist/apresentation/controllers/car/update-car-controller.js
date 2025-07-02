"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class UpdateCarController {
    validation;
    updateCar;
    constructor(validation, updateCar) {
        this.validation = validation;
        this.updateCar = updateCar;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const carId = httpRequest.params.carId;
            const ownerId = httpRequest.token?.sub;
            if (!ownerId) {
                return (0, http_helpers_1.badRequest)(new Error('Id do proprietário não localizado no token'));
            }
            const updateData = { ...httpRequest.body, images: httpRequest.files || [] };
            const updatedCar = await this.updateCar.update(carId, updateData, ownerId);
            return (0, http_helpers_1.ok)(updatedCar);
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
exports.UpdateCarController = UpdateCarController;
//# sourceMappingURL=update-car-controller.js.map