import { Notification, NotificationAttributes } from '../../domain/models/notification';
import { AddNotificationRepository, ListNotificationsByUserRepository, MarkNotificationAsReadRepository } from '../../data/repositories/notification-repository';

export class NotificationSequelizeAdapter implements AddNotificationRepository, ListNotificationsByUserRepository, MarkNotificationAsReadRepository {
  async add(data: Omit<NotificationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'isRead'>): Promise<NotificationAttributes> {
    const notification = await Notification.create({ ...data, isRead: false } as any);
    return notification.toJSON();
  }

  async listByUser(userId: string): Promise<NotificationAttributes[]> {
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    return notifications.map(n => n.toJSON());
  }

  async markAsRead(notificationId: string): Promise<boolean> {
    const notification = await Notification.findByPk(notificationId);
    if (!notification) return false;
    notification.isRead = true;
    await notification.save();
    return true;
  }
} 