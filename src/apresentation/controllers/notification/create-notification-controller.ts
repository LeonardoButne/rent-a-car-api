import { badRequest, ok, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { CreateNotification } from '../../../domain/usecases/notification-usecases';
import { Validation } from '../../protocols/validation';

export class CreateNotificationController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createNotification: CreateNotification
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const { userId, type, title, message, reservationId, deviceToken } = httpRequest.body;
      const notification = await this.createNotification.create({ userId, type, title, message, reservationId, deviceToken });
      return ok(notification);
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