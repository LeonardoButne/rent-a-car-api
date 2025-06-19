import { Router } from "express";
import { makeSignupUserController} from "../factories/client/client-signup-factory";
import { expressAdapterRouter } from "../adapters/express-router-adapter";
import { makeConfirmSignupUserController } from "../factories/client/client-confirm-signup-factory";

const router = Router();

router.post('/signup', expressAdapterRouter(makeSignupUserController()));
router.post('/signup/confirm', expressAdapterRouter(makeConfirmSignupUserController()));

export default router;