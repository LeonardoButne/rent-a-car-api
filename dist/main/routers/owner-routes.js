"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const owner_signup_factory_1 = require("../factories/owner/owner-signup-factory");
const express_router_adapter_1 = require("../adapters/express-router-adapter");
const owner_confirm_signup_factory_1 = require("../factories/owner/owner-confirm-signup-factory");
const get_account_owner_by_id_factory_1 = require("../factories/owner/get-account-owner-by-id-factory");
const express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
// Supondo que exista um middleware de auth para owner, se não, pode-se usar o mesmo do user
const db_load_user_by_token_1 = require("../middlewares/db-load-user-by-token/db-load-user-by-token");
const verify_login_owner_otp_1 = require("../factories/owner/verify-login-owner-otp");
const makeLoginOwnerController_1 = require("../factories/owner/makeLoginOwnerController");
const resend_otp_owner_factory_1 = require("../factories/owner/resend-otp-owner-factory");
const create_car_factory_1 = require("../factories/car/create-car-factory");
const list_cars_by_owner_factory_1 = require("../factories/car/list-cars-by-owner-factory");
const update_car_factory_1 = require("../factories/car/update-car-factory");
const delete_car_factory_1 = require("../factories/car/delete-car-factory");
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
const multer_1 = __importDefault(require("multer"));
const delete_car_image_factory_1 = require("../factories/car/delete-car-image-factory");
const router = (0, express_1.Router)();
const authOwnerMiddleware = (0, express_middleware_adapter_1.middlewareAdapter)((0, db_load_user_by_token_1.makeAuthUserMiddleware)());
const upload = (0, multer_1.default)(multerConfig_1.default);
router.post('/signup', (0, express_router_adapter_1.expressAdapterRouter)((0, owner_signup_factory_1.makeSignupOwnerController)()));
router.post('/signup/confirm', (0, express_router_adapter_1.expressAdapterRouter)((0, owner_confirm_signup_factory_1.makeConfirmSignupOwnerController)()));
router.get('/account', authOwnerMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, get_account_owner_by_id_factory_1.makeGetAccountOwnerByIdController)()));
router.post('/login/verify-otp', (0, express_router_adapter_1.expressAdapterRouter)((0, verify_login_owner_otp_1.makeVerifyLoginOwnerOtpController)()));
router.post('/login', (0, express_router_adapter_1.expressAdapterRouter)((0, makeLoginOwnerController_1.makeLoginOwnerController)()));
router.post('/resend-otp-owner', (0, express_router_adapter_1.expressAdapterRouter)((0, resend_otp_owner_factory_1.makeResendOtpOwnerController)()));
//para gerir carros:
router.post('/create/car', authOwnerMiddleware, upload.array('images'), (0, express_router_adapter_1.expressAdapterRouter)((0, create_car_factory_1.makeCreateCarController)()));
router.get('/my-cars', authOwnerMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, list_cars_by_owner_factory_1.makeListCarsByOwnerController)()));
router.patch('/car/:carId', authOwnerMiddleware, upload.array('images'), (0, express_router_adapter_1.expressAdapterRouter)((0, update_car_factory_1.makeUpdateCarController)()));
router.delete('/car/:carId', authOwnerMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, delete_car_factory_1.makeDeleteCarController)()));
router.delete('/car/:carId/image/:imageId', authOwnerMiddleware, (0, express_router_adapter_1.expressAdapterRouter)((0, delete_car_image_factory_1.makeDeleteCarImageController)()));
exports.default = router;
//# sourceMappingURL=owner-routes.js.map