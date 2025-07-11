import { Router } from 'express';
import { makeSignupOwnerController } from '../factories/owner/owner-signup-factory';
import { expressAdapterRouter } from '../adapters/express-router-adapter';
import { makeConfirmSignupOwnerController } from '../factories/owner/owner-confirm-signup-factory';
import { makeGetAccountOwnerByIdController } from '../factories/owner/get-account-owner-by-id-factory';
import { middlewareAdapter } from '../adapters/express-middleware-adapter';
// Supondo que exista um middleware de auth para owner, se não, pode-se usar o mesmo do user
import { makeAuthUserMiddleware } from '../middlewares/db-load-user-by-token/db-load-user-by-token';
import { makeVerifyLoginOwnerOtpController } from '../factories/owner/verify-login-owner-otp';
import { makeLoginOwnerController } from '../factories/owner/makeLoginOwnerController';
import { makeResendOtpOwnerController } from '../factories/owner/resend-otp-owner-factory';
import { makeCreateCarController } from '../factories/car/create-car-factory';
import { makeListCarsByOwnerController } from '../factories/car/list-cars-by-owner-factory';
import { makeUpdateCarController } from '../factories/car/update-car-factory';
import { makeDeleteCarController } from '../factories/car/delete-car-factory';
import multerConfig from '../../config/multerConfig';
import multer from 'multer';
import { makeDeleteCarImageController } from '../factories/car/delete-car-image-factory';
import { makeListReservationsController } from '../factories/owner/list-reservations-factory';
import { makeUpdateReservationStatusController } from '../factories/owner/update-reservation-status-factory';
import { makeApproveReservationController } from '../factories/owner/approve-reservation-factory';
import { makeRejectReservationController } from '../factories/owner/reject-reservation-factory';
import { makeDeviceTokenController } from '../factories/device-token-factory';


const router = Router();
const authOwnerMiddleware = middlewareAdapter(makeAuthUserMiddleware());
const upload = multer(multerConfig);

router.post('/signup', expressAdapterRouter(makeSignupOwnerController()));
router.post('/signup/confirm', expressAdapterRouter(makeConfirmSignupOwnerController()));
router.get('/account', authOwnerMiddleware, expressAdapterRouter(makeGetAccountOwnerByIdController()));
router.post('/login/verify-otp', expressAdapterRouter(makeVerifyLoginOwnerOtpController()));
router.post('/login', expressAdapterRouter(makeLoginOwnerController()));
router.post('/resend-otp-owner', expressAdapterRouter(makeResendOtpOwnerController()));
router.post('/device-token', authOwnerMiddleware, expressAdapterRouter(makeDeviceTokenController()));


//para gerir carros:

router.post('/create/car',authOwnerMiddleware,upload.array('images'), expressAdapterRouter(makeCreateCarController()));
router.get('/my-cars',authOwnerMiddleware, expressAdapterRouter(makeListCarsByOwnerController()));
router.patch('/car/:carId',authOwnerMiddleware, upload.array('images'),expressAdapterRouter(makeUpdateCarController()));
router.delete('/car/:carId',authOwnerMiddleware, expressAdapterRouter(makeDeleteCarController()));
router.delete('/car/:carId/image/:imageId', authOwnerMiddleware, expressAdapterRouter(makeDeleteCarImageController()));

// Rotas de reservas do owner
router.get('/reservations', authOwnerMiddleware, expressAdapterRouter(makeListReservationsController()));
router.patch('/reservations/:reservationId', authOwnerMiddleware, expressAdapterRouter(makeUpdateReservationStatusController()));
router.patch('/reservations/:reservationId/approve', authOwnerMiddleware, expressAdapterRouter(makeApproveReservationController()));
router.patch('/reservations/:reservationId/reject', authOwnerMiddleware, expressAdapterRouter(makeRejectReservationController()));



export default router;
