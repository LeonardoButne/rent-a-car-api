import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { ListAllCars } from '../../../domain/usecases/car/list-all-cars-usecase';

export class ListAllCarsController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listAllCars: ListAllCars
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const cars = await this.listAllCars.listAllCars();
      return ok(cars);
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