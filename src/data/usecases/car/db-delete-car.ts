import { DeleteCar } from '../../../domain/usecases/car/delete-car-usecase';
import { CarRepository } from '../../repositories/car-repository';
import { Reservation } from '../../../domain/models/reservation';
import { DeviceSequelizeAdapter } from '../../../infraestruture/database/device-sequelize-adapter';
import { NotificationSequelizeAdapter } from '../../../infraestruture/database/notification-sequelize-adapter';
import { DbCreateNotification } from '../notification';
import { sendPushNotification } from '../../../main/utils/send-push-notification';

export class DbDeleteCar implements DeleteCar {
  constructor(private readonly carRepository: CarRepository) {}

  async delete(id: string): Promise<void> {
    // 1. Buscar reservas pendentes/ativas desse carro
    const pendingReservations = await Reservation.findAll({
      where: {
        carId: id,
        status: ['pending', 'approved']
      }
    });

    // 2. Cancelar e notificar cada reserva
    const deviceRepo = new DeviceSequelizeAdapter();
    const notificationRepo = new NotificationSequelizeAdapter();
    const createNotification = new DbCreateNotification(notificationRepo);

    for (const reservation of pendingReservations) {
      reservation.status = 'cancelled';
      await reservation.save();
      // Notificar cliente
      const title = 'Reserva cancelada';
      const message = 'Sua reserva foi cancelada porque o carro foi removido do sistema.';
      await createNotification.create({
        userId: reservation.clientId,
        type: 'reservation_cancelled',
        title,
        message,
        reservationId: reservation.id,
      });
      // Push notification
      const devices = await deviceRepo.listDevicesByUser(reservation.clientId, 'client');
      for (const device of devices) {
        if (device.deviceId) {
          try {
            await sendPushNotification(
              device.deviceId,
              title,
              message,
              { reservationId: reservation.id, type: 'reservation_cancelled' },
              { sound: 'default' }
            );
          } catch (e) {
            // Logar erro mas não interromper fluxo
            console.warn('Erro ao enviar push para device', device.deviceId, e);
          }
        }
      }
    }
    // 3. Deletar o carro
    await this.carRepository.delete(id);
  }
} 