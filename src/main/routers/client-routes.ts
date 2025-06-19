import { Router } from 'express';
import { makeSignupUserController } from '../factories/client/client-signup-factory';
import { expressAdapterRouter } from '../adapters/express-router-adapter';
import { makeConfirmSignupUserController } from '../factories/client/client-confirm-signup-factory';
import { makeGetAccountClientByIdController } from '../factories/client/get-account-client-by-id-factory';
import { middlewareAdapter } from '../adapters/express-middleware-adapter';
import { makeAuthUserMiddleware } from '../middlewares/db-load-user-by-token/db-load-user-by-token';
import { makeVerifyLoginClientOtpController } from '../factories/client/verify-login-client-otp';
import { makeLoginClientController } from '../factories/client/makeLoginClientController';

const router = Router();
const authUserMiddleware = middlewareAdapter(makeAuthUserMiddleware());

router.post('/signup', expressAdapterRouter(makeSignupUserController()));
router.post('/signup/confirm', expressAdapterRouter(makeConfirmSignupUserController()));
router.get('/account', authUserMiddleware, expressAdapterRouter(makeGetAccountClientByIdController()));
router.post('/login/verify-otp', expressAdapterRouter(makeVerifyLoginClientOtpController()));
router.post('/login', expressAdapterRouter(makeLoginClientController()));

export default router;
