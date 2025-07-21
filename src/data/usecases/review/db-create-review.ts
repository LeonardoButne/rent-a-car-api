import { CreateReviewInput, CreateReviewUsecase } from '../../../domain/usecases/review-usecases';
import { Review } from '../../../domain/models/review';
import { ReviewRepository } from '../../repositories/review-repository';
import { GetReservationByIdRepository } from '../../repositories/reservation-repository';

export class DbCreateReview implements CreateReviewUsecase {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly reservationRepository: GetReservationByIdRepository,
  ) {}

  async create(data: CreateReviewInput): Promise<Review> {
    // Verifica se a reserva existe, pertence ao client e está concluída
    const reservation = await this.reservationRepository.getById(data.reservationId);
    if (!reservation || reservation.clientId !== data.clientId || reservation.ownerId !== data.ownerId || reservation.status !== 'completed') {
      throw new Error('Reserva inválida para avaliação.');
    }
    // Verifica se já existe avaliação para essa reserva
    const alreadyReviewed = await this.reviewRepository.existsReviewByReservation(data.reservationId);
    if (alreadyReviewed) {
      throw new Error('Já existe avaliação para esta reserva.');
    }
    // Cria avaliação
    return this.reviewRepository.createReview({
      ...data,
      carId: reservation.carId,
    });
  }
} 