import { noContent, badRequest, serverError, forbidden } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { DeleteCar } from '../../../domain/usecases/car/delete-car-usecase';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export class DeleteCarController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteCar: DeleteCar
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const carId = httpRequest.params.carId;
      const userId = httpRequest.token?.sub;
      const userRole = httpRequest.token?.typeAccount;
      if (!userId) {
        return badRequest(new Error('Id do usuário não localizado no token'));
      }
      const carRepo = new CarSequelizeAdapter();
      const car = await carRepo.getCarById(carId);
      if (!car) {
        return badRequest(new Error('Carro não encontrado.'));
      }
      // Se não for admin, só pode excluir se for o dono
      if (userRole !== 'admin' && car.ownerId !== userId) {
        return forbidden(new Error('Somente o proprietário ou um administrador pode excluir este carro.'));
      }
      await this.deleteCar.delete(carId);
      return noContent();
    } catch (error) {
        if (error.errors) {
            return serverError({
              erro: error?.errors?.map((err: any) => err?.message),
            })
          } else {
            return serverError({ error })
          }
    }
  }
} 