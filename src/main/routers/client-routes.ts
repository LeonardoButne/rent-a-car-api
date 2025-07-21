import { Router } from 'express';
import { makeSignupUserController } from '../factories/client/client-signup-factory';
import { expressAdapterRouter } from '../adapters/express-router-adapter';
import { makeConfirmSignupUserController } from '../factories/client/client-confirm-signup-factory';
import { makeGetAccountClientByIdController } from '../factories/client/get-account-client-by-id-factory';
import { middlewareAdapter } from '../adapters/express-middleware-adapter';
import { makeAuthUserMiddleware } from '../middlewares/db-load-user-by-token/db-load-user-by-token';
import { makeVerifyLoginClientOtpController } from '../factories/client/verify-login-client-otp';
import { makeLoginClientController } from '../factories/client/makeLoginClientController';
import { makeResendOtpUserController } from '../factories/client/resend-otp-client-factory';
import { makeListMyReservationsController } from '../factories/client/list-my-reservations-factory';
import { makeGetReservationByIdController } from '../factories/client/get-reservation-by-id-factory';
import { makeCancelReservationController } from '../factories/client/cancel-reservation-factory';
import { makeEditReservationController } from '../factories/client/edit-reservation-factory';
import { makeCreateReservationController } from '../factories/client/create-reservation-factory';
import { makeActivateReservationController } from '../factories/client/activate-reservation-factory';
import { makeFinishReservationController } from '../factories/client/finish-reservation-factory';
import { makeDeviceTokenController } from '../factories/device-token-factory';
import { makeCreateReviewController } from '../factories/review/create-review-factory';

const router = Router();
const authUserMiddleware = middlewareAdapter(makeAuthUserMiddleware());

router.post('/signup', expressAdapterRouter(makeSignupUserController()));
router.post('/signup/confirm', expressAdapterRouter(makeConfirmSignupUserController()));
router.get('/account', authUserMiddleware, expressAdapterRouter(makeGetAccountClientByIdController()));
router.post('/login/verify-otp', expressAdapterRouter(makeVerifyLoginClientOtpController()));
router.post('/login', expressAdapterRouter(makeLoginClientController()));
router.post('/resend-otp-client', expressAdapterRouter(makeResendOtpUserController()));
router.post('/device-token', authUserMiddleware, expressAdapterRouter(makeDeviceTokenController()));

// Rotas de reserva
router.post('/reservations', authUserMiddleware, expressAdapterRouter(makeCreateReservationController()));
router.get('/reservations/my', authUserMiddleware, expressAdapterRouter(makeListMyReservationsController()));
router.get('/reservations/:reservationId', authUserMiddleware, expressAdapterRouter(makeGetReservationByIdController()));
router.delete('/reservations/:reservationId', authUserMiddleware, expressAdapterRouter(makeCancelReservationController()));
router.patch('/reservations/:reservationId', authUserMiddleware, expressAdapterRouter(makeEditReservationController()));
router.patch('/reservations/:reservationId/activate', authUserMiddleware, expressAdapterRouter(makeActivateReservationController()));
router.patch('/reservations/:reservationId/complete', authUserMiddleware, expressAdapterRouter(makeFinishReservationController()));

router.post('/reviews', authUserMiddleware, expressAdapterRouter(makeCreateReviewController()));

export default router;
  