import { Router } from 'express';
import { expressAdapterRouter } from '../adapters/express-router-adapter';
import { makeLoginController } from '../factories/makeLoginController';
import { makeVerifyOtpLoginUserController } from '../factories/verify-otp-login-user-factory';
import { makeResendOtpUserController } from '../factories/resend-otp-user-factory';

const router = Router();

router.post('/login', expressAdapterRouter(makeLoginController()));
router.post('/verify-otp', expressAdapterRouter(makeVerifyOtpLoginUserController()));
router.post('/resend-otp', expressAdapterRouter(makeResendOtpUserController()));

export default router; 