import { ReservationAttributes } from '../../domain/models/reservation';

export interface AddReservationRepository {
  add(data: Omit<ReservationAttributes, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReservationAttributes>;
}

export interface ListReservationsByClientRepository {
  listByClient(clientId: string): Promise<ReservationAttributes[]>;
}

export interface ListReservationsByOwnerRepository {
  listByOwner(ownerId: string): Promise<ReservationAttributes[]>;
}

export interface GetReservationByIdRepository {
  getById(reservationId: string): Promise<ReservationAttributes | null>;
}

export interface CancelReservationRepository {
  cancel(reservationId: string, clientId: string): Promise<boolean>;
}

export interface EditReservationRepository {
  edit(
    reservationId: string,
    clientId: string,
    data: Partial<Pick<ReservationAttributes, 'startDate' | 'endDate' | 'notes'>>
  ): Promise<ReservationAttributes | null>;
}

export interface UpdateReservationStatusRepository {
  updateStatus(
    reservationId: string,
    ownerId: string,
    status: 'approved' | 'rejected'
  ): Promise<ReservationAttributes | null>;
}

export interface ActivateReservationRepository {
  activate(reservationId: string, clientId: string): Promise<ReservationAttributes | null>;
}

export interface CompleteReservationRepository {
  complete(reservationId: string, ownerId: string): Promise<ReservationAttributes | null>;
}

export interface FinishReservationRepository {
  finish(reservationId: string, clientId: string): Promise<ReservationAttributes | null>;
} 