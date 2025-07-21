import { ListReviewsByOwnerController } from '../../../apresentation/controllers/review/list-reviews-by-owner-controller';
import { DbListReviewsByOwner } from '../../../data/usecases/review/db-list-reviews-by-owner';
import { ReviewRepository } from '../../../data/repositories/review-repository';
import { ReviewSequelizeAdapter } from '../../../infraestruture/database/review-sequelize-adapter';

export const makeListReviewsByOwnerController = () => {
  const reviewAdapter = new ReviewSequelizeAdapter();
  const reviewRepository = new ReviewRepository();
  const usecase = new DbListReviewsByOwner(reviewAdapter);
  return new ListReviewsByOwnerController(usecase);
}; 