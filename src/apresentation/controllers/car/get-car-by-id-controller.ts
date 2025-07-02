import { ok, badRequest, notFound, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { GetCarByIdUseCase } from '../../../domain/usecases/car/get-car-by-id-usecase';

export class GetCarByIdController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getCarById: GetCarByIdUseCase
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const carId = httpRequest.params.carId;
      const car = await this.getCarById.getCarById(carId);
      if (!car) return notFound(new Error('Car not found'));
      return ok(car);
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