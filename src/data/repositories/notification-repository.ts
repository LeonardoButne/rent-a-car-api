import { NotificationAttributes } from '../../domain/models/notification';

export interface AddNotificationRepository {
  add(data: Omit<NotificationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'isRead'>): Promise<NotificationAttributes>;
}

export interface ListNotificationsByUserRepository {
  listByUser(userId: string): Promise<NotificationAttributes[]>;
}

export interface MarkNotificationAsReadRepository {
  markAsRead(notificationId: string): Promise<boolean>;
} 