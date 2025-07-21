import { ReviewAttributes, Review } from '../models/review';

export interface CreateReviewInput {
  ownerId: string;
  clientId: string;
  reservationId: string;
  rating: number;
  comment?: string;
}

export interface CreateReviewUsecase {
  create(data: CreateReviewInput): Promise<Review>;
}

export interface ListReviewsByOwnerUsecase {
  list(ownerId: string): Promise<Review[]>;
}

export interface ExistsReviewByReservationUsecase {
  exists(reservationId: string): Promise<boolean>;
}

export interface ListReviewsByCarUsecase {
  list(carId: string): Promise<Review[]>;
} 