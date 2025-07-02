"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCarController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
const car_sequelize_adapter_1 = require("../../../infraestruture/database/car-sequelize-adapter");
class DeleteCarController {
    validation;
    deleteCar;
    constructor(validation, deleteCar) {
        this.validation = validation;
        this.deleteCar = deleteCar;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return (0, http_helpers_1.badRequest)(error);
            }
            const carId = httpRequest.params.carId;
            const userId = httpRequest.token?.sub;
            const userRole = httpRequest.token?.typeAccount;
            if (!userId) {
                return (0, http_helpers_1.badRequest)(new Error('Id do usuário não localizado no token'));
            }
            const carRepo = new car_sequelize_adapter_1.CarSequelizeAdapter();
            const car = await carRepo.getCarById(carId);
            if (!car) {
                return (0, http_helpers_1.badRequest)(new Error('Carro não encontrado.'));
            }
            // Se não for admin, só pode excluir se for o dono
            if (userRole !== 'admin' && car.ownerId !== userId) {
                return (0, http_helpers_1.forbidden)(new Error('Somente o proprietário ou um administrador pode excluir este carro.'));
            }
            await this.deleteCar.delete(carId);
            return (0, http_helpers_1.noContent)();
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
exports.DeleteCarController = DeleteCarController;
//# sourceMappingURL=delete-car-controller.js.map