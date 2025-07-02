"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeVerifyLoginOwnerOtpController = void 0;
const verify_otp_login_owner_controller_1 = require("../../../apresentation/controllers/owner/verify-otp-login-owner-controller");
const email_validation_1 = require("../../../apresentation/validations/email-validation");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_verify_otp_login_owner_1 = require("../../../data/usecases/owner/db-verify-otp-login-owner");
const jwt_adpter_1 = require("../../../infraestruture/cryptograph/jwt/jwt-adpter");
const owner_sequelize_adapter_1 = require("../../../infraestruture/database/owner-sequelize-adapter");
const email_validation_adapter_1 = require("../../utils/email-validation-adapter");
const verify_otp_adapter_1 = require("../../utils/verify-otp-adapter");
const makeVerifyLoginOwnerOtpController = () => {
    // 1 - Infrastructure layer (adapters/repos)
    const ownerRepository = new owner_sequelize_adapter_1.OwnerSequelizeAdapter();
    const verifyOtpAdapter = new verify_otp_adapter_1.VerifyOtpAdapter();
    const jwtAdapter = new jwt_adpter_1.JwtAdapter(process.env.JWTSECRET_KEY);
    // 2 - Use Case layer (domain logic)
    const verifyOtpLoginUseCase = new db_verify_otp_login_owner_1.DbVerifyOtpLoginOwner(ownerRepository, verifyOtpAdapter, jwtAdapter);
    // 3 - Validation layer
    const validations = [];
    for (const field of ['otp', 'email']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    validations.push(new email_validation_1.EmailValidation('email', new email_validation_adapter_1.EmailValidationAdapter()));
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    // 4️⃣ Controller layer
    return new verify_otp_login_owner_controller_1.VerifyOtpLoginOwnerController(validationComposite, verifyOtpLoginUseCase);
};
exports.makeVerifyLoginOwnerOtpController = makeVerifyLoginOwnerOtpController;
//# sourceMappingURL=verify-login-owner-otp.js.map