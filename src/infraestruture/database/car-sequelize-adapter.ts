import { Car } from '../../domain/models/car';
import { CarImage } from '../../domain/models/carImage';
import { CarRepository } from '../../data/repositories/car-repository';
import { CarModel, CarWithoutId } from '../../domain/usecases/car/create-car-usecase';
import { CarSearchFilters } from '../../domain/usecases/car/search-cars-usecase';
import { Op } from 'sequelize';
import { saveFilesToDisk } from '../../main/utils/save-files-to-disk';
import { CarNotFoundError } from '../../apresentation/errors/car-not-found-error';
import { ForbiddenAccessError } from '../../apresentation/errors/forbidden-acess-error';
import { Owner } from '../../domain/models/owner';
import * as fs from 'fs';
import * as path from 'path';

function toCarModel(car: any): CarModel {
  return car as CarModel;
}

export class CarSequelizeAdapter implements CarRepository {
  async add(data: CarWithoutId): Promise<CarModel> {
    // Extrai as imagens do payload, se houver
    const { images, ...carData } = data as any;
    const created = await Car.create(carData as any);

    // Só salva as imagens se o carro foi criado
    if (images && Array.isArray(images) && images.length > 0) {
      for (const file of images) {
        const fileName = await saveFilesToDisk(file);
        await CarImage.create({
          carId: created.id,
          fileName,
          originalName: file.originalname,
        });
      }
    }

    return toCarModel(created.toJSON());
  }

  async update(id: string, data: Partial<CarWithoutId>, ownerId: string): Promise<CarModel> {
    

    let { images, existingImages, ...carData } = data as any;
    if (typeof existingImages === 'string') {
      try {
        existingImages = JSON.parse(existingImages);
      } catch (e) {
        existingImages = [];
      }
    }
    console.log('existingImages:', existingImages);
    const car = await Car.findByPk(id, { include: [{ model: CarImage, as: 'images' }] });

    if (!car) {
      throw new CarNotFoundError();
    }

    if (car.ownerId !== ownerId) {
      throw new ForbiddenAccessError();
    }

    // Atualiza os dados do carro
    await Car.update(carData, { where: { id } });

    // Remover imagens que não estão em existingImageUrls
    if (existingImages && Array.isArray(existingImages)) {
      const carImages = await CarImage.findAll({ where: { carId: id } });
      console.log('carImages:', carImages.map(img => img.fileName));
      // Extrai só os nomes dos arquivos das URLs recebidas do frontend
      const existingFileNames = existingImages.map((url: string) => url.split('/').pop());
      console.log('existingFileNames:', existingFileNames);

      // PROTEÇÃO: se existingFileNames está vazio mas há imagens no banco, não remova nada!
      if (carImages.length > 0 && existingFileNames.length === 0) {
        console.warn('Proteção: existingImages vazio, não removendo imagens');
        // Não remove nada, apenas segue
      } else {
        const imagesToRemove = carImages.filter((img: any) => !existingFileNames.includes(img.fileName));
        console.log('imagesToRemove:', imagesToRemove.map(img => img.fileName));
        for (const img of imagesToRemove) {
          // Remover do banco
          await CarImage.destroy({ where: { id: img.id } });
          // Remover do storage
          const filePath = path.join(__dirname, '../../../uploads/img', img.fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
    }

    // Adiciona novas imagens
    if (images && Array.isArray(images) && images.length > 0) {
      for (const file of images) {
        const fileName = await saveFilesToDisk(file);
        await CarImage.create({
          carId: id,
          fileName,
          originalName: file.originalname,
        });
      }
    }

    // Retorna o carro atualizado com imagens
    const updated = await Car.findByPk(id, { include: [{ model: CarImage, as: 'images' }] });
    if (!updated) throw new CarNotFoundError();
    return toCarModel(updated.toJSON());
  }

  async delete(id: string): Promise<void> {
    await Car.destroy({ where: { id } });
  }

  async getCarById(id: string): Promise<CarModel | null> {
    const car = await Car.findByPk(id, {
      include: [{ model: CarImage, as: 'images' }],
    });
    return car ? toCarModel(car.toJSON()) : null;
  }

  async listCarsByOwner(ownerId: string): Promise<CarModel[]> {
    const cars = await Car.findAll({ where: { ownerId }, include: [{ model: CarImage, as: 'images' }] });
    return cars.map((c) => toCarModel(c.toJSON()));
  }

  async listAllCars(): Promise<CarModel[]> {
    const cars = await Car.findAll({
      include: [
        {
          model: CarImage,
          as: 'images',
          attributes: ['id', 'fileName', 'originalName', 'url'],
        },
        {
          model: Owner,
          as: 'owner',
          attributes: ['id', 'name', 'lastName', 'telephone', 'email', 'address', 'subscriptionPackage', 'isSuspended'],
        },
      ],
    });

    return cars.map((c) => toCarModel(c.toJSON()));
  }

  async search(filters: CarSearchFilters): Promise<CarModel[]> {
    const where: any = {};

    // Campos de igualdade direta
    const equalityFields = [
      'ownerId',
      'marca',
      'modelo',
      'classe',
      'categorias',
      'cor',
      'combustivel',
      'lugares',
      'transmissao',
      'featured',
      'disponibilidade',
      'localizacao',
      'seguro',
      'placa',
    ];

    for (const field of equalityFields) {
      if (filters[field as keyof CarSearchFilters] !== undefined) {
        where[field] = filters[field as keyof CarSearchFilters];
      }
    }

    // Campos com ranges
    if (filters.anoMin !== undefined || filters.anoMax !== undefined) {
      where.ano = {};
      if (filters.anoMin !== undefined) where.ano[Op.gte] = filters.anoMin;
      if (filters.anoMax !== undefined) where.ano[Op.lte] = filters.anoMax;
    }

    if (filters.precoPorDiaMin !== undefined || filters.precoPorDiaMax !== undefined) {
      where.precoPorDia = {};
      if (filters.precoPorDiaMin !== undefined) where.precoPorDia[Op.gte] = filters.precoPorDiaMin;
      if (filters.precoPorDiaMax !== undefined) where.precoPorDia[Op.lte] = filters.precoPorDiaMax;
    }

    if (filters.quilometragemMax !== undefined) {
      where.quilometragem = { [Op.lte]: filters.quilometragemMax };
    }

    const cars = await Car.findAll({ where });
    return cars.map((c) => toCarModel(c.toJSON()));
  }
}
