import { ok, badRequest, serverError, forbidden } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { UpdateCar } from '../../../domain/usecases/car/update-car-usecase';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export class UpdateCarController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateCar: UpdateCar
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const carId = httpRequest.params.carId;
      const ownerId = httpRequest.token?.sub;
      if (!ownerId) {
        return badRequest(new Error('Id do proprietário não localizado no token'));
      }
      const updateData = { ...httpRequest.body, images: httpRequest.files || [] };
      const updatedCar = await this.updateCar.update(carId, updateData, ownerId);
      return ok(updatedCar);
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