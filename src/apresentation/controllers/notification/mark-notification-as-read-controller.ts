import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { MarkNotificationAsRead } from '../../../domain/usecases/notification-usecases';

export class MarkNotificationAsReadController implements Controller {
  constructor(private readonly markNotificationAsRead: MarkNotificationAsRead) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return badRequest(new Error('id é obrigatório.'));
      }
      const result = await this.markNotificationAsRead.markAsRead(id);
      if (!result) {
        return badRequest(new Error('Não foi possível marcar como lida.'));
      }
      return ok({ read: true });
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