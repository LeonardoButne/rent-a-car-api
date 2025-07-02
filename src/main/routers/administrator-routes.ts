import { Router } from 'express';
import { expressAdapterRouter } from '../adapters/express-router-adapter';
import { makeSignupAdministratorController } from '../factories/administrator/administrator-signup-factory';
import { makeConfirmSignupAdministratorController } from '../factories/administrator/administrator-confirm-signup-factory';
import { makeLoginAdministratorController } from '../factories/administrator/administrator-login-factory';
import { makeVerifyOtpLoginAdministratorController } from '../factories/administrator/administrator-verify-otp-login-factory';
import { makeGetDashboardSummaryController } from '../factories/administrator/get-dashboard-summary-factory';
import { makeListClientsController } from '../factories/administrator/list-clients-factory';
import { makeSuspendClientController } from '../factories/administrator/suspend-client-factory';
import { makeDeleteClientController } from '../factories/administrator/delete-client-factory';
import { makeListOwnersController } from '../factories/administrator/list-owners-factory';
import { makeSuspendOwnerController } from '../factories/administrator/suspend-owner-factory';
import { makeDeleteOwnerController } from '../factories/administrator/delete-owner-factory';
import { makeListSubscriptionsController } from '../factories/administrator/list-subscriptions-factory';
import { makeGetSubscriptionByOwnerController } from '../factories/administrator/get-subscription-by-owner-factory';
import { makeUpdateSubscriptionController } from '../factories/administrator/update-subscription-factory';
import { makeGetRevenueReportController } from '../factories/administrator/get-revenue-report-factory';
import { makeGetReservationsReportController } from '../factories/administrator/get-reservations-report-factory';
import { middlewareAdapter } from '../adapters/express-middleware-adapter';
import { makeAuthUserMiddleware } from '../middlewares/db-load-user-by-token/db-load-user-by-token';

const router = Router();
const authUserMiddleware = middlewareAdapter(makeAuthUserMiddleware());


// Autenticação
router.post('/signup', expressAdapterRouter(makeSignupAdministratorController()));
router.post('/signup/confirm', expressAdapterRouter(makeConfirmSignupAdministratorController()));
router.post('/login', expressAdapterRouter(makeLoginAdministratorController()));
router.post('/login/verify-otp', expressAdapterRouter(makeVerifyOtpLoginAdministratorController()));

// Dashboard
router.get('/dashboard/summary',authUserMiddleware, expressAdapterRouter(makeGetDashboardSummaryController()));

// Gestão de Clientes
router.get('/clients',authUserMiddleware, expressAdapterRouter(makeListClientsController()));
router.patch('/clients/:clientId/suspend',authUserMiddleware, expressAdapterRouter(makeSuspendClientController()));
router.delete('/clients/:clientId',authUserMiddleware, expressAdapterRouter(makeDeleteClientController()));

// Gestão de Donos de Carros
router.get('/owners',authUserMiddleware, expressAdapterRouter(makeListOwnersController()));
router.patch('/owners/:ownerId/suspend',authUserMiddleware, expressAdapterRouter(makeSuspendOwnerController()));
router.delete('/owners/:ownerId',authUserMiddleware, expressAdapterRouter(makeDeleteOwnerController()));

// Gestão de Subscrições
router.get('/subscriptions',authUserMiddleware, expressAdapterRouter(makeListSubscriptionsController()));
router.get('/subscriptions/:ownerId',authUserMiddleware, expressAdapterRouter(makeGetSubscriptionByOwnerController()));
router.patch('/subscriptions/:ownerId/update',authUserMiddleware, expressAdapterRouter(makeUpdateSubscriptionController()));

// Relatórios
router.get('/reports/revenue',authUserMiddleware, expressAdapterRouter(makeGetRevenueReportController()));
router.get('/reports/reservations',authUserMiddleware, expressAdapterRouter(makeGetReservationsReportController()));

export default router;
