import { ok, badRequest, serverError } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { CreateNotification, ListNotificationsByUser, MarkNotificationAsRead } from '../../domain/usecases/notification-usecases';

export class NotificationController implements Controller {
  constructor(
    private readonly createNotification: CreateNotification,
    private readonly listNotificationsByUser: ListNotificationsByUser,
    private readonly markNotificationAsRead: MarkNotificationAsRead
  ) {}

  // Por padrão, handle delega para create (POST /notifications)
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.create(httpRequest);
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId, type, title, message, reservationId, deviceToken } = httpRequest.body;
      if (!userId || !type || !title || !message || !reservationId) {
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const notification = await this.createNotification.create({ userId, type, title, message, reservationId, deviceToken });
      return ok(notification);
    } catch (error) {
      return serverError({ error });
    }
  }

  // Para GET /notifications?userId=...
  async listByUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.query;
      if (!userId) {
        return badRequest(new Error('userId é obrigatório.'));
      }
      const notifications = await this.listNotificationsByUser.listByUser(userId);
      return ok(notifications);
    } catch (error) {
      return serverError({ error });
    }
  }

  // Para PATCH /notifications/:id/read
  async markAsRead(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      return serverError({ error });
    }
  }
} 