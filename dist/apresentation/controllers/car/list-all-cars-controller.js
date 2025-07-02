"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllCarsController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class ListAllCarsController {
    validation;
    listAllCars;
    constructor(validation, listAllCars) {
        this.validation = validation;
        this.listAllCars = listAllCars;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const cars = await this.listAllCars.listAllCars();
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
exports.ListAllCarsController = ListAllCarsController;
//# sourceMappingURL=list-all-cars-controller.js.map