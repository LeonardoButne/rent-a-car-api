import { ListReviewsByOwnerUsecase } from '../../../domain/usecases/review-usecases';
import { Review } from '../../../domain/models/review';
import { ReviewRepository } from '../../repositories/review-repository';

export class DbListReviewsByOwner implements ListReviewsByOwnerUsecase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async list(ownerId: string): Promise<Review[]> {
    return this.reviewRepository.listReviewsByOwner(ownerId);
  }
} 