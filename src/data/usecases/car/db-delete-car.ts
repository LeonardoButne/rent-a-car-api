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
    // 0. Bloquear se houver reservas aprovadas ou ativas
    const ongoingReservations = await Reservation.findOne({
      where: {
        carId: id,
        status: ['approved', 'active']
      }
    });
    if (ongoingReservations) {
      throw new Error('Não é possível remover este carro pois ele possui reservas em andamento ou aprovadas. O proprietário deve primeiro finalizar ou cancelar essas reservas.');
    }

    // 1. Buscar reservas pendentes desse carro
    const pendingReservations = await Reservation.findAll({
      where: {
        carId: id,
        status: ['pending']
      }
    });

    // 2. Cancelar e notificar cada reserva pendente
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
        type: 'reservation_rejected', // Use um tipo permitido pelo ENUM do banco
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
              { reservationId: reservation.id, type: 'reservation_rejected' },
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