"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_router_adapter_1 = require("../adapters/express-router-adapter");
const administrator_signup_factory_1 = require("../factories/administrator/administrator-signup-factory");
const administrator_confirm_signup_factory_1 = require("../factories/administrator/administrator-confirm-signup-factory");
const administrator_login_factory_1 = require("../factories/administrator/administrator-login-factory");
const administrator_verify_otp_login_factory_1 = require("../factories/administrator/administrator-verify-otp-login-factory");
const get_dashboard_summary_factory_1 = require("../factories/administrator/get-dashboard-summary-factory");
const list_clients_factory_1 = require("../factories/administrator/list-clients-factory");
const suspend_client_factory_1 = require("../factories/administrator/suspend-client-factory");
const delete_client_factory_1 = require("../factories/administrator/delete-client-factory");
const list_owners_factory_1 = require("../factories/administrator/list-owners-factory");
const suspend_owner_factory_1 = require("../factories/administrator/suspend-owner-factory");
const delete_owner_factory_1 = require("../factories/administrator/delete-owner-factory");
const list_subscriptions_factory_1 = require("../factories/administrator/list-subscriptions-factory");
const get_subscription_by_owner_factory_1 = require("../factories/administrator/get-subscription-by-owner-factory");
const update_subscription_factory_1 = require("../factories/administrator/update-subscription-factory");
const get_revenue_report_factory_1 = require("../factories/administrator/get-revenue-report-factory");
const get_reservations_report_factory_1 = require("../factories/administrator/get-reservations-report-factory");
const express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
const db_load_user_by_token_1 = require("../middlewares/db-load-user-by-token/db-load-user-by-token");
const router = (0, express_1.Router)();
const authUserMiddleware = (0, express_middleware_adapter_1.middlewareAdapter)((0, db_load_user_by_token_1.makeAuthUserMiddleware)());
// Autenticação
router.post('/signup', (0, express_router_adapter_1.expressAdapterRouter)((0, administrator_signup_factory_1.makeSignupAdministratorController)()));
router.post('/signup/confirm', (0, express_router_adapter_1.expressAdapterRouter)((0, administrator_confirm_signup_factory_1.makeConfirmSignupAdministratorController)()));
router.post('/login', (0, express_router_adapter_1.expressAdapterRouter)((0, administrator_login_factory_1.makeLoginAdministratorController)()));
router.post('/login/verify-otp', (0, express_router_adapter_1.expressAdapterRouter)((0, administrator_verify_otp_login_factory_1.makeVerifyOtpLoginAdministratorController)()));
// Dashboard
router.get('/dashboard/summary', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, get_dashboard_summary_factory_1.makeGetDashboardSummaryController)()));
// Gestão de Clientes
router.get('/clients', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, list_clients_factory_1.makeListClientsController)()));
router.patch('/clients/:clientId/suspend', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, suspend_client_factory_1.makeSuspendClientController)()));
router.delete('/clients/:clientId', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, delete_client_factory_1.makeDeleteClientController)()));
// Gestão de Donos de Carros
router.get('/owners', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, list_owners_factory_1.makeListOwnersController)()));
router.patch('/owners/:ownerId/suspend', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, suspend_owner_factory_1.makeSuspendOwnerController)()));
router.delete('/owners/:ownerId', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, delete_owner_factory_1.makeDeleteOwnerController)()));
// Gestão de Subscrições
router.get('/subscriptions', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, list_subscriptions_factory_1.makeListSubscriptionsController)()));
router.get('/subscriptions/:ownerId', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, get_subscription_by_owner_factory_1.makeGetSubscriptionByOwnerController)()));
router.patch('/subscriptions/:ownerId/update', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, update_subscription_factory_1.makeUpdateSubscriptionController)()));
// Relatórios
router.get('/reports/revenue', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, get_revenue_report_factory_1.makeGetRevenueReportController)()));
router.get('/reports/reservations', authUserMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, get_reservations_report_factory_1.makeGetReservationsReportController)()));
exports.default = router;
//# sourceMappingURL=administrator-routes.js.map