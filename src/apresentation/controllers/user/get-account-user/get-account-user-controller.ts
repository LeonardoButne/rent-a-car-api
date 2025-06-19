import { badRequest, ok } from '../../../../apresentation/helpers/http-helpers';
import { GetAccountUser } from '../../../../domain/usecases/user-usecases/get-account-user-by-id-usecase';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class GetAccountUserByIdController implements Controller {
  constructor(private readonly getAccountUser: GetAccountUser) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
