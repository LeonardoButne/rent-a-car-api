"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class CreateCarController {
    validation;
    createCar;
    constructor(validation, createCar) {
        this.validation = validation;
        this.createCar = createCar;
    }
    async handle(httpRequest) {
        console.log('FILES RECEBIDOS:', httpRequest.files);
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const ownerId = httpRequest.token?.sub;
            const isSuspended = httpRequest.token?.isSuspended;
            if (!ownerId) {
                return (0, http_helpers_1.badRequest)(new Error('Proprietário não encontrado.'));
            }
            if (isSuspended) {
                return (0, http_helpers_1.forbidden)(new Error('Conta suspensa. Não é permitido cadastrar carros.'));
            }
            const carData = { ...httpRequest.body, ownerId, images: httpRequest.files || [] };
            const car = await this.createCar.add(carData);
            return (0, http_helpers_1.created)(car);
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
exports.CreateCarController = CreateCarController;
//# sourceMappingURL=create-car-controller.js.map