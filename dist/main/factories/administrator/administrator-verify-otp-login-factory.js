"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeVerifyOtpLoginAdministratorController = void 0;
const verify_otp_login_administrator_controller_1 = require("../../../apresentation/controllers/administrator/verify-otp-login-administrator-controller");
const email_validation_1 = require("../../../apresentation/validations/email-validation");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_verify_otp_login_administrator_1 = require("../../../data/usecases/administrator/db-verify-otp-login-administrator");
const jwt_adpter_1 = require("../../../infraestruture/cryptograph/jwt/jwt-adpter");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const email_validation_adapter_1 = require("../../utils/email-validation-adapter");
const verify_otp_adapter_1 = require("../../utils/verify-otp-adapter");
const makeVerifyOtpLoginAdministratorController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const verifyOtpAdapter = new verify_otp_adapter_1.VerifyOtpAdapter();
    const jwtAdapter = new jwt_adpter_1.JwtAdapter(process.env.JWTSECRET_KEY);
    const verifyOtpLoginUseCase = new db_verify_otp_login_administrator_1.DbVerifyOtpLoginAdministrator(adminRepository, verifyOtpAdapter, jwtAdapter);
    const validations = [];
    for (const field of ['otp', 'email']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    validations.push(new email_validation_1.EmailValidation('email', new email_validation_adapter_1.EmailValidationAdapter()));
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    return new verify_otp_login_administrator_controller_1.VerifyOtpLoginAdministratorController(validationComposite, verifyOtpLoginUseCase);
};
exports.makeVerifyOtpLoginAdministratorController = makeVerifyOtpLoginAdministratorController;
//# sourceMappingURL=administrator-verify-otp-login-factory.js.map