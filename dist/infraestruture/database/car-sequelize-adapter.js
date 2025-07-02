"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSequelizeAdapter = void 0;
const car_1 = require("../../domain/models/car");
const carImage_1 = require("../../domain/models/carImage");
const sequelize_1 = require("sequelize");
const save_files_to_disk_1 = require("../../main/utils/save-files-to-disk");
const car_not_found_error_1 = require("../../apresentation/errors/car-not-found-error");
const forbidden_acess_error_1 = require("../../apresentation/errors/forbidden-acess-error");
function toCarModel(car) {
    return car;
}
class CarSequelizeAdapter {
    async add(data) {
        // Extrai as imagens do payload, se houver
        const { images, ...carData } = data;
        const created = await car_1.Car.create(carData);
        // Só salva as imagens se o carro foi criado
        if (images && Array.isArray(images) && images.length > 0) {
            for (const file of images) {
                const fileName = await (0, save_files_to_disk_1.saveFilesToDisk)(file);
                await carImage_1.CarImage.create({
                    carId: created.id,
                    fileName,
                    originalName: file.originalname,
                });
            }
        }
        return toCarModel(created.toJSON());
    }
    async update(id, data, ownerId) {
        const { images, ...carData } = data;
        const car = await car_1.Car.findByPk(id);
        if (!car) {
            throw new car_not_found_error_1.CarNotFoundError();
        }
        if (car.ownerId !== ownerId) {
            throw new forbidden_acess_error_1.ForbiddenAccessError();
        }
        // Atualiza os dados do carro
        await car_1.Car.update(carData, { where: { id } });
        // Apenas adiciona novas imagens, não apaga as antigas
        if (images && Array.isArray(images) && images.length > 0) {
            for (const file of images) {
                const fileName = await (0, save_files_to_disk_1.saveFilesToDisk)(file);
                await carImage_1.CarImage.create({
                    carId: id,
                    fileName,
                    originalName: file.originalname,
                });
            }
        }
        // Retorna o carro atualizado com imagens
        const updated = await car_1.Car.findByPk(id, { include: [{ model: carImage_1.CarImage, as: 'images' }] });
        if (!updated)
            throw new car_not_found_error_1.CarNotFoundError();
        return toCarModel(updated.toJSON());
    }
    async delete(id) {
        await car_1.Car.destroy({ where: { id } });
    }
    async getCarById(id) {
        const car = await car_1.Car.findByPk(id, {
            include: [{ model: carImage_1.CarImage, as: 'images' }]
        });
        return car ? toCarModel(car.toJSON()) : null;
    }
    async listCarsByOwner(ownerId) {
        const cars = await car_1.Car.findAll({ where: { ownerId },
            include: [{ model: carImage_1.CarImage, as: 'images' }]
        });
        return cars.map((c) => toCarModel(c.toJSON()));
    }
    async listAllCars() {
        const cars = await car_1.Car.findAll();
        return cars.map((c) => toCarModel(c.toJSON()));
    }
    async search(filters) {
        const where = {};
        // Campos de igualdade direta
        const equalityFields = [
            'ownerId', 'marca', 'modelo', 'classe', 'categorias', 'cor',
            'combustivel', 'lugares', 'transmissao', 'featured',
            'disponibilidade', 'localizacao', 'seguro', 'placa'
        ];
        for (const field of equalityFields) {
            if (filters[field] !== undefined) {
                where[field] = filters[field];
            }
        }
        // Campos com ranges
        if (filters.anoMin !== undefined || filters.anoMax !== undefined) {
            where.ano = {};
            if (filters.anoMin !== undefined)
                where.ano[sequelize_1.Op.gte] = filters.anoMin;
            if (filters.anoMax !== undefined)
                where.ano[sequelize_1.Op.lte] = filters.anoMax;
        }
        if (filters.precoPorDiaMin !== undefined || filters.precoPorDiaMax !== undefined) {
            where.precoPorDia = {};
            if (filters.precoPorDiaMin !== undefined)
                where.precoPorDia[sequelize_1.Op.gte] = filters.precoPorDiaMin;
            if (filters.precoPorDiaMax !== undefined)
                where.precoPorDia[sequelize_1.Op.lte] = filters.precoPorDiaMax;
        }
        if (filters.quilometragemMax !== undefined) {
            where.quilometragem = { [sequelize_1.Op.lte]: filters.quilometragemMax };
        }
        const cars = await car_1.Car.findAll({ where });
        return cars.map((c) => toCarModel(c.toJSON()));
    }
}
exports.CarSequelizeAdapter = CarSequelizeAdapter;
//# sourceMappingURL=car-sequelize-adapter.js.map