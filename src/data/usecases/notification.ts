import { CreateNotification, ListNotificationsByUser, MarkNotificationAsRead } from '../../domain/usecases/notification-usecases';
import { NotificationAttributes } from '../../domain/models/notification';
import { AddNotificationRepository, ListNotificationsByUserRepository, MarkNotificationAsReadRepository } from '../repositories/notification-repository';

export class DbCreateNotification implements CreateNotification {
  constructor(private readonly addNotificationRepository: AddNotificationRepository) {}
  async create(data: Omit<NotificationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'isRead'>): Promise<NotificationAttributes> {
    return this.addNotificationRepository.add(data);
  }
}

export class DbListNotificationsByUser implements ListNotificationsByUser {
  constructor(private readonly listNotificationsByUserRepository: ListNotificationsByUserRepository) {}
  async listByUser(userId: string): Promise<NotificationAttributes[]> {
    return this.listNotificationsByUserRepository.listByUser(userId);
  }
}

export class DbMarkNotificationAsRead implements MarkNotificationAsRead {
  constructor(private readonly markNotificationAsReadRepository: MarkNotificationAsReadRepository) {}
  async markAsRead(notificationId: string): Promise<boolean> {
    return this.markNotificationAsReadRepository.markAsRead(notificationId);
  }
} 