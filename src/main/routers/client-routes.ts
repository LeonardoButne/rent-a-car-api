import { Router } from "express";
import { UserFactory } from "../factories/client-factory";
import { expressAdapterRouter } from "../adapters/express-router-adapter";

const router = Router();

router.post('/signup', expressAdapterRouter(UserFactory.makeSignupUserController()));


export default router;