import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { ListNotificationsByUser } from '../../../domain/usecases/notification-usecases';

export class ListNotificationsByUserController implements Controller {
  constructor(private readonly listNotificationsByUser: ListNotificationsByUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.query;
      if (!userId) {
        return badRequest(new Error('userId é obrigatório.'));
      }
      const notifications = await this.listNotificationsByUser.listByUser(userId);
      return ok(notifications);
    } catch (error) {
      if (error && error.stack) {
        console.error('STACK:', error.stack);
      }
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