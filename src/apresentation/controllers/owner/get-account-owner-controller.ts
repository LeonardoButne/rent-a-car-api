import { badRequest, ok } from '../../helpers/http-helpers';
import { GetAccountOwner } from '../../../domain/usecases/owner-usecases/get-account-owner-by-id-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetAccountOwnerByIdController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getAccountOwner: GetAccountOwner,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest);
    if (error) {
      return badRequest(error);
    }

    const ownerId = httpRequest.token?.sub;

    if (!ownerId) {
      return badRequest(new Error('Id não localizado'));
    }

    const account = await this.getAccountOwner.getAccountById(ownerId);

    if (!account) {
      return badRequest(new Error('Conta não localizada'));
    }

    return ok(account);
  }
} 