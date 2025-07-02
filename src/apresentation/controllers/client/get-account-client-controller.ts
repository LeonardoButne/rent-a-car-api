import { badRequest, ok } from '../../helpers/http-helpers';
import { GetAccountClient } from '../../../domain/usecases/client-usecases/get-account-client-by-id-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetAccountClientByIdController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getAccountUser: GetAccountClient,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest);
    if (error) {
      return badRequest(error);
    }

    const userId = httpRequest.token?.sub;

    if (!userId) {
      return badRequest(new Error('Id não localizado'));
    }

    const account = await this.getAccountUser.getAccountById(userId);

    if (!account) {
      return badRequest(new Error('Conta não localizada'));
    }

    return ok(account);
  }
}
