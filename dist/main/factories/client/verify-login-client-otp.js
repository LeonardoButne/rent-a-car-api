"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeVerifyLoginClientOtpController = void 0;
const verify_otp_login_client_controller_1 = require("../../../apresentation/controllers/client/verify-otp-login-client-controller");
const email_validation_1 = require("../../../apresentation/validations/email-validation");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_verify_otp_login_1 = require("../../../data/usecases/user/db-verify-otp-login");
const jwt_adpter_1 = require("../../../infraestruture/cryptograph/jwt/jwt-adpter");
const user_sequelize_adapter_1 = require("../../../infraestruture/database/user-sequelize-adapter");
const email_validation_adapter_1 = require("../../utils/email-validation-adapter");
const verify_otp_adapter_1 = require("../../utils/verify-otp-adapter");
const makeVerifyLoginClientOtpController = () => {
    // 1 - Infrastructure layer (adapters/repos)
    const clientRepository = new user_sequelize_adapter_1.ClientSequelizeAdapter();
    const verifyOtpAdapter = new verify_otp_adapter_1.VerifyOtpAdapter();
    const jwtAdapter = new jwt_adpter_1.JwtAdapter(process.env.JWTSECRET_KEY);
    // 2 - Use Case layer (domain logic)
    const verifyOtpLoginUseCase = new db_verify_otp_login_1.DbVerifyOtpLogin(clientRepository, verifyOtpAdapter, jwtAdapter);
    // 3 - Validation layer
    const validations = [];
    for (const field of ['otp', 'email']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    validations.push(new email_validation_1.EmailValidation('email', new email_validation_adapter_1.EmailValidationAdapter()));
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    // 4️⃣ Controller layer
    return new verify_otp_login_client_controller_1.VerifyOtpLoginClientController(validationComposite, verifyOtpLoginUseCase);
};
exports.makeVerifyLoginClientOtpController = makeVerifyLoginClientOtpController;
//# sourceMappingURL=verify-login-client-otp.js.map