import { Review, ReviewAttributes } from '../../domain/models/review';

export class ReviewRepository {
  async createReview(data: Omit<ReviewAttributes, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
    return Review.create(data as any);
  }

  async listReviewsByOwner(ownerId: string): Promise<Review[]> {
    return Review.findAll({ where: { ownerId }, order: [['createdAt', 'DESC']] });
  }

  async listReviewsByCar(carId: string): Promise<Review[]> {
    return Review.findAll({ where: { carId }, order: [['createdAt', 'DESC']] });
  }

  async existsReviewByReservation(reservationId: string): Promise<boolean> {
    const count = await Review.count({ where: { reservationId } });
    return count > 0;
  }
} 