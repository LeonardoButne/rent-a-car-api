import { NotificationAttributes } from '../models/notification';

export interface CreateNotification {
  create(data: Omit<NotificationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'isRead'>): Promise<NotificationAttributes>;
}

export interface ListNotificationsByUser {
  listByUser(userId: string): Promise<NotificationAttributes[]>;
}

export interface MarkNotificationAsRead {
  markAsRead(notificationId: string): Promise<boolean>;
}

export interface RegisterDeviceTokenUsecase {
  register(params: { userId: string; userType: 'client' | 'owner'; deviceId: string }): Promise<void>;
} 