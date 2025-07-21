import { DeviceRepository } from '../data/repositories/device-repository';
import { DbCreateNotification } from '../data/usecases/notification';
import { sendPushNotification } from '../main/utils/send-push-notification';
import { CarSequelizeAdapter } from '../infraestruture/database/car-sequelize-adapter';

interface NotifyOwnerOnReservationCreatedParams {
  ownerId: string;
  carId: string;
  reservationId: string;
}

interface NotifyClientOnReservationStatusChangedParams {
  clientId: string;
  reservationId: string;
  status: 'approved' | 'rejected';
}

export class ReservationNotificationService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly createNotification: DbCreateNotification,
  ) {}

  async notifyOwnerOnReservationCreated({ ownerId, carId, reservationId }: NotifyOwnerOnReservationCreatedParams): Promise<void> {
    try {
      const carRepo = new CarSequelizeAdapter();
      const car = await carRepo.getCarById(carId);
      const carInfo = car ? `${car.marca} ${car.modelo}` : 'um carro';
      const devices = await this.deviceRepository.listDevicesByUser(ownerId, 'owner');
      const notificationData = {
        userId: ownerId,
        type: 'reservation_request' as 'reservation_request',
        title: 'Nova solicitação de reserva',
        message: `Você recebeu uma nova solicitação de reserva do cliente para o carro ${carInfo}.`,
        reservationId,
      };
      await this.createNotification.create(notificationData);
      for (const device of devices) {
        if (device.deviceId) {
          try {
            await sendPushNotification(
              device.deviceId,
              notificationData.title,
              notificationData.message,
              { reservationId, type: 'reservation_request' },
              { sound: 'default' }
            );
          } catch (pushError) {
            console.log('[ReservationNotificationService] Error sending push to device', device.deviceId, pushError);
          }
        }
      }
    } catch (error) {
      console.log('[ReservationNotificationService] Error in notifyOwnerOnReservationCreated', error);
      throw error;
    }
  }

  async notifyClientOnReservationStatusChanged({ clientId, reservationId, status }: NotifyClientOnReservationStatusChangedParams): Promise<void> {
    try {
      const devices = await this.deviceRepository.listDevicesByUser(clientId, 'client');
      let notificationType: 'reservation_approved' | 'reservation_rejected';
      let title: string;
      let message: string;
      if (status === 'approved') {
        notificationType = 'reservation_approved';
        title = 'Reserva aprovada';
        message = 'Sua reserva foi aprovada pelo proprietário.';
      } else {
        notificationType = 'reservation_rejected';
        title = 'Reserva rejeitada';
        message = 'Sua reserva foi rejeitada pelo proprietário.';
      }
      const notificationData = {
        userId: clientId,
        type: notificationType,
        title,
        message,
        reservationId,
      };
      await this.createNotification.create(notificationData);
      for (const device of devices) {
        if (device.deviceId) {
          try {
            await sendPushNotification(
              device.deviceId,
              title,
              message,
              { reservationId, type: notificationType },
              { sound: 'default' }
            );
          } catch (pushError) {
            if (pushError?.message?.includes('UNREGISTERED')) {
              await this.deviceRepository.removeDevice(device.deviceId);
            }
          }
        }
      }
    } catch (error) {
      console.log('[ReservationNotificationService] Error in notifyClientOnReservationStatusChanged', error);
      throw error;
    }
  }
} 