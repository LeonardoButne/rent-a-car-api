import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { ListCarsByOwnerUseCase } from '../../../domain/usecases/car/list-cars-by-owner-usecase';

export class ListCarsByOwnerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listCarsByOwner: ListCarsByOwnerUseCase
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const ownerId = httpRequest.token?.sub;
      if (!ownerId) {
        return badRequest(new Error('Id do proprietário não localizado no token'));
      }
      const cars = await this.listCarsByOwner.listCarsByOwner(ownerId);
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