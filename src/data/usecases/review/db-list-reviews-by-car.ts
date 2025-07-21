import { ListReviewsByCarUsecase } from '../../../domain/usecases/review-usecases';
import { Review } from '../../../domain/models/review';
import { ReviewRepository } from '../../repositories/review-repository';

export class DbListReviewsByCar implements ListReviewsByCarUsecase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async list(carId: string): Promise<Review[]> {
    return this.reviewRepository.listReviewsByCar(carId);
  }
} 