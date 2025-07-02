"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCarImageController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
const carImage_1 = require("../../../domain/models/carImage");
const path_1 = require("path");
const promises_1 = require("fs/promises");
class DeleteCarImageController {
    async handle(httpRequest) {
        try {
            const { carId, imageId } = httpRequest.params;
            // 1. Busca a imagem no banco
            const image = await carImage_1.CarImage.findOne({ where: { id: imageId, carId } });
            if (!image)
                return (0, http_helpers_1.badRequest)(new Error('Imagem não encontrada'));
            // 2. Remove do disco
            const filePath = (0, path_1.resolve)(__dirname, '../../../infraestruture/uploads/img', image.fileName);
            try {
                await (0, promises_1.unlink)(filePath);
            }
            catch { }
            // 3. Remove do banco
            await image.destroy();
            return (0, http_helpers_1.ok)({ message: 'Imagem removida com sucesso' });
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.DeleteCarImageController = DeleteCarImageController;
//# sourceMappingURL=delete-car-image-controller.js.map