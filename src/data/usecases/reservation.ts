import {
  CreateReservation,
  ListReservationsByClient,
  ListReservationsByOwner,
  GetReservationById,
  CancelReservation,
  EditReservation,
  UpdateReservationStatus,
  CompleteReservation,
} from '../../domain/usecases/reservation-usecases';
import { ReservationAttributes } from '../../domain/models/reservation';
import {
  AddReservationRepository,
  ListReservationsByClientRepository,
  ListReservationsByOwnerRepository,
  GetReservationByIdRepository,
  CancelReservationRepository,
  EditReservationRepository,
  UpdateReservationStatusRepository,
} from '../repositories/reservation-repository';
import { CarSequelizeAdapter } from '../../infraestruture/database/car-sequelize-adapter';
import { Reservation } from '../../domain/models/reservation';
import { ReservationSequelizeAdapter } from '../../infraestruture/database/reservation-sequelize-adapter';

export class DbCreateReservation implements CreateReservation {
  constructor(private readonly addReservationRepository: AddReservationRepository) {}
  async create(data: Omit<ReservationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'price'>): Promise<ReservationAttributes> {
    // Buscar o preço do carro
    const carRepo = new CarSequelizeAdapter();
    const car = await carRepo.getCarById(data.carId);
    if (!car) throw new Error('Carro não encontrado');
    // Calcular dias
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Cálculo por faixas
    const months = Math.floor(totalDays / 30);
    const weeks = Math.floor((totalDays % 30) / 7);
    const days = (totalDays % 30) % 7;
    const price = (months * car.precoPorMes) + (weeks * car.precoPorSemana) + (days * car.precoPorDia);
    return this.addReservationRepository.add({ ...data, price });
  }
}

export class DbListReservationsByClient implements ListReservationsByClient {
  constructor(private readonly repo: ListReservationsByClientRepository) {}
  async listByClient(clientId: string): Promise<ReservationAttributes[]> {
    return this.repo.listByClient(clientId);
  }
}

export class DbListReservationsByOwner implements ListReservationsByOwner {
  constructor(private readonly repo: ListReservationsByOwnerRepository) {}
  async listByOwner(ownerId: string): Promise<ReservationAttributes[]> {
    return this.repo.listByOwner(ownerId);
  }
}

export class DbGetReservationById implements GetReservationById {
  constructor(private readonly repo: GetReservationByIdRepository) {}
  async getById(reservationId: string): Promise<ReservationAttributes | null> {
    return this.repo.getById(reservationId);
  }
}

export class DbCancelReservation implements CancelReservation {
  constructor(private readonly repo: CancelReservationRepository) {}
  async cancel(reservationId: string, clientId: string): Promise<boolean> {
    return this.repo.cancel(reservationId, clientId);
  }
}

export class DbEditReservation implements EditReservation {
  constructor(private readonly repo: EditReservationRepository & GetReservationByIdRepository) {}
  async edit(
    reservationId: string,
    clientId: string,
    data: Partial<Pick<ReservationAttributes, 'startDate' | 'endDate' | 'notes'>>
  ): Promise<ReservationAttributes | null> {
    let price;
    if (data.startDate || data.endDate) {
      // Buscar a reserva atual para pegar carId e datas antigas
      const current = await this.repo.getById(reservationId);
      if (!current) return null;
      const carRepo = new CarSequelizeAdapter();
      const car = await carRepo.getCarById(current.carId);
      if (!car) return null;
      const start = new Date(data.startDate ?? current.startDate);
      const end = new Date(data.endDate ?? current.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const months = Math.floor(totalDays / 30);
      const weeks = Math.floor((totalDays % 30) / 7);
      const days = (totalDays % 30) % 7;
      price = (months * car.precoPorMes) + (weeks * car.precoPorSemana) + (days * car.precoPorDia);
    }
    return this.repo.edit(reservationId, clientId, { ...data, ...(price !== undefined ? { price } : {}) });
  }
}

export class DbUpdateReservationStatus implements UpdateReservationStatus {
  constructor(private readonly repo: UpdateReservationStatusRepository) {}
  async updateStatus(reservationId: string, ownerId: string, status: 'approved' | 'rejected'): Promise<any> {
    return await this.repo.updateStatus(reservationId, ownerId, status);
  }
}

export class DbCompleteReservation implements CompleteReservation {
  async complete(reservationId: string, ownerId: string): Promise<any> {
    const repo = new ReservationSequelizeAdapter();
    return await repo.complete(reservationId, ownerId);
  }
} 