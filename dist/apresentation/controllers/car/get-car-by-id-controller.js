"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCarByIdController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class GetCarByIdController {
    validation;
    getCarById;
    constructor(validation, getCarById) {
        this.validation = validation;
        this.getCarById = getCarById;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const carId = httpRequest.params.carId;
            const car = await this.getCarById.getCarById(carId);
            if (!car)
                return (0, http_helpers_1.notFound)(new Error('Car not found'));
            return (0, http_helpers_1.ok)(car);
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
exports.GetCarByIdController = GetCarByIdController;
//# sourceMappingURL=get-car-by-id-controller.js.map