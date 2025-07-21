import { ListReviewsByCarController } from '../../../apresentation/controllers/review/list-reviews-by-car-controller';
import { DbListReviewsByCar } from '../../../data/usecases/review/db-list-reviews-by-car';
import { ReviewRepository } from '../../../data/repositories/review-repository';
import { ReviewSequelizeAdapter } from '../../../infraestruture/database/review-sequelize-adapter';

export const makeListReviewsByCarController = () => {
  const reviewAdapter = new ReviewSequelizeAdapter();
  const reviewRepository = new ReviewRepository();
  const usecase = new DbListReviewsByCar(reviewAdapter);
  return new ListReviewsByCarController(usecase);
}; 