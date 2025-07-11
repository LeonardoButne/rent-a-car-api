import { CreateNotification, ListNotificationsByUser, MarkNotificationAsRead, RegisterDeviceTokenUsecase } from '../../domain/usecases/notification-usecases';
import { NotificationAttributes } from '../../domain/models/notification';
import { AddNotificationRepository, ListNotificationsByUserRepository, MarkNotificationAsReadRepository } from '../repositories/notification-repository';
import { DeviceRepository } from '../repositories/device-repository';

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

export class DbRegisterDeviceToken implements RegisterDeviceTokenUsecase {
  constructor(private readonly deviceRepository: DeviceRepository) {}
  async register(params: { userId: string; userType: 'client' | 'owner'; deviceId: string }): Promise<void> {
    // Remove device antigo se existir para esse userId/userType/deviceId
    await this.deviceRepository.removeDevice(params.deviceId);
    // Adiciona o novo device
    await this.deviceRepository.addDevice({
      userId: params.userId,
      userType: params.userType,
      deviceId: params.deviceId,
    });
  }
} 