import { Reservation, ReservationAttributes } from '../../domain/models/reservation';
import {
  AddReservationRepository,
  ListReservationsByClientRepository,
  ListReservationsByOwnerRepository,
  GetReservationByIdRepository,
  CancelReservationRepository,
  EditReservationRepository,
  UpdateReservationStatusRepository,
  ActivateReservationRepository,
} from '../../data/repositories/reservation-repository';
import { Client } from '../../domain/models/client';
import { Owner } from '../../domain/models/owner';
import { Car } from '../../domain/models/car';
import { CarImage } from '../../domain/models/carImage';

export class ReservationSequelizeAdapter
  implements
    AddReservationRepository,
    ListReservationsByClientRepository,
    ListReservationsByOwnerRepository,
    GetReservationByIdRepository,
    CancelReservationRepository,
    EditReservationRepository,
    UpdateReservationStatusRepository,
    ActivateReservationRepository
{
  async add(data: Omit<ReservationAttributes, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReservationAttributes> {
    const reservation = await Reservation.create(data as any);
    return reservation.toJSON();
  }

  async listByClient(clientId: string): Promise<ReservationAttributes[]> {
    const reservations = await Reservation.findAll({ 
      where: { clientId },
      include: [
        { model: Client, as: 'client', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Owner, as: 'owner', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Car, as: 'car', include: [{ model: CarImage, as: 'images' }] },
      ]
    });
    return reservations.map(r => r.toJSON());
  }

  async listByOwner(ownerId: string): Promise<ReservationAttributes[]> {
    const reservations = await Reservation.findAll({ 
      where: { ownerId },
      include: [
        { model: Client, as: 'client', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Owner, as: 'owner', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Car, as: 'car', include: [{ model: CarImage, as: 'images' }] },
      ]
    });
    return reservations.map(r => r.toJSON());
  }

  async getById(reservationId: string): Promise<ReservationAttributes | null> {
    const reservation = await Reservation.findByPk(reservationId, {
      include: [
        { model: Client, as: 'client', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Owner, as: 'owner', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Car, as: 'car', include: [{ model: CarImage, as: 'images' }] },
      ]
    });
    return reservation ? reservation.toJSON() : null;
  }

  async cancel(reservationId: string, clientId: string): Promise<boolean> {
    const reservation = await Reservation.findOne({ where: { id: reservationId, clientId, status: 'pending' } });
    if (!reservation) return false;
    reservation.status = 'cancelled';
    await reservation.save();
    return true;
  }

  async edit(
    reservationId: string,
    clientId: string,
    data: Partial<Pick<ReservationAttributes, 'startDate' | 'endDate' | 'notes' | 'price'>>
  ): Promise<ReservationAttributes | null> {
    const reservation = await Reservation.findOne({ where: { id: reservationId, clientId, status: 'pending' } });
    if (!reservation) return null;
    if (data.startDate) reservation.startDate = data.startDate;
    if (data.endDate) reservation.endDate = data.endDate;
    if (data.notes !== undefined) reservation.notes = data.notes;
    if (data.price !== undefined) reservation.price = data.price;
    await reservation.save();
    return reservation.toJSON();
  }

  async updateStatus(
    reservationId: string,
    ownerId: string,
    status: 'approved' | 'rejected'
  ): Promise<ReservationAttributes | null> {
    const reservation = await Reservation.findOne({ where: { id: reservationId, ownerId, status: 'pending' } });
    if (!reservation) return null;
    reservation.status = status;
    await reservation.save();
    return await Reservation.findByPk(reservationId, {
      include: [
        { model: Client, as: 'client', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Owner, as: 'owner', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Car, as: 'car', include: [{ model: CarImage, as: 'images' }] },
      ]
    })?.then(r => r?.toJSON() ?? null);
  }

  async activate(reservationId: string, clientId: string): Promise<ReservationAttributes | null> {
    const reservation = await Reservation.findOne({ where: { id: reservationId, clientId, status: 'approved' } });
    if (!reservation) return null;
    reservation.status = 'active';
    await reservation.save();
    return await Reservation.findByPk(reservationId, {
      include: [
        { model: Client, as: 'client', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Owner, as: 'owner', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Car, as: 'car', include: [{ model: CarImage, as: 'images' }] },
      ]
    })?.then(r => r?.toJSON() ?? null);
  }

  async complete(reservationId: string, ownerId: string): Promise<ReservationAttributes | null> {
    const reservation = await Reservation.findOne({ where: { id: reservationId, ownerId, status: 'active' } });
    if (!reservation) return null;
    reservation.status = 'completed';
    await reservation.save();
    return await Reservation.findByPk(reservationId, {
      include: [
        { model: Client, as: 'client', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Owner, as: 'owner', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Car, as: 'car', include: [{ model: CarImage, as: 'images' }] },
      ]
    })?.then(r => r?.toJSON() ?? null);
  }

  async finish(reservationId: string, clientId: string): Promise<ReservationAttributes | null> {
    const reservation = await Reservation.findOne({ where: { id: reservationId, clientId, status: 'active' } });
    if (!reservation) return null;
    reservation.status = 'completed';
    await reservation.save();
    return await Reservation.findByPk(reservationId, {
      include: [
        { model: Client, as: 'client', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Owner, as: 'owner', attributes: { exclude: ['password', 'secretKey'] } },
        { model: Car, as: 'car', include: [{ model: CarImage, as: 'images' }] },
      ]
    })?.then(r => r?.toJSON() ?? null);
  }
} 