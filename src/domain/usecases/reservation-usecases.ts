import { ReservationAttributes } from '../models/reservation';

export interface CreateReservation {
  create(data: {
    carId: string;
    clientId: string;
    ownerId: string;
    startDate: Date;
    endDate: Date;
    notes?: string;
  }): Promise<ReservationAttributes>;
}

export interface ListReservationsByClient {
  listByClient(clientId: string): Promise<ReservationAttributes[]>;
}

export interface ListReservationsByOwner {
  listByOwner(ownerId: string): Promise<ReservationAttributes[]>;
}

export interface GetReservationById {
  getById(reservationId: string): Promise<ReservationAttributes | null>;
}

export interface CancelReservation {
  cancel(reservationId: string, clientId: string): Promise<boolean>;
}

export interface EditReservation {
  edit(
    reservationId: string,
    clientId: string,
    data: {
      startDate?: Date;
      endDate?: Date;
      notes?: string;
    }
  ): Promise<ReservationAttributes | null>;
}

export interface UpdateReservationStatus {
  updateStatus(
    reservationId: string,
    ownerId: string,
    status: 'approved' | 'rejected'
  ): Promise<boolean>;
} 