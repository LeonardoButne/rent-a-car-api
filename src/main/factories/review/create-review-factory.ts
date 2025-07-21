import { CreateReviewController } from '../../../apresentation/controllers/review/create-review-controller';
import { DbCreateReview } from '../../../data/usecases/review/db-create-review';
import { ReviewRepository } from '../../../data/repositories/review-repository';
import { ReviewSequelizeAdapter } from '../../../infraestruture/database/review-sequelize-adapter';
import { GetReservationByIdRepository } from '../../../data/repositories/reservation-repository';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { RequiredFieldValidation } from '../../../apresentation/validations/required-field-validation';
import { Validation } from '../../../apresentation/protocols/validation';

// Supondo que já exista um adapter para Reservation
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

class RatingRangeValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  validate(input: any) {
    const value = input.body?.[this.fieldName];
    if (typeof value !== 'number' || value < 1 || value > 5) {
      return new Error('rating deve ser um número entre 1 e 5');
    }
    return null;
  }
}

export const makeCreateReviewController = () => {
  const validations: Validation[] = [];
  for (const field of ['ownerId', 'reservationId', 'rating']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new RatingRangeValidation('rating'));
  const validation = new ValidationComposite(validations);

  const reviewAdapter = new ReviewSequelizeAdapter();
  const reviewRepository = new ReviewRepository();
  // Adapter de reservation precisa implementar GetReservationByIdRepository
  const reservationAdapter = new ReservationSequelizeAdapter();
  const usecase = new DbCreateReview(reviewAdapter, reservationAdapter);
  return new CreateReviewController(validation, usecase);
}; 