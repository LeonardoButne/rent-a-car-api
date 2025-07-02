"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfirmSignupAdministratorController = void 0;
const confirm_signup_administrator_controller_1 = require("../../../apresentation/controllers/administrator/confirm-signup-administrator-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_confirm_signup_administrator_1 = require("../../../data/usecases/administrator/db-confirm-signup-administrator");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const verify_otp_adapter_1 = require("../../utils/verify-otp-adapter");
const makeConfirmSignupAdministratorController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const verifyOtpAdapter = new verify_otp_adapter_1.VerifyOtpAdapter();
    const confirmSignupAdministrator = new db_confirm_signup_administrator_1.DbConfirmSignupAdministrator(verifyOtpAdapter, adminRepository);
    const validations = new validation_composite_1.ValidationComposite([
        new request_field_validation_1.RequestFieldValidation('email'),
        new request_field_validation_1.RequestFieldValidation('otp')
    ]);
    return new confirm_signup_administrator_controller_1.ConfirmSignupAdministratorController(validations, adminRepository, confirmSignupAdministrator);
};
exports.makeConfirmSignupAdministratorController = makeConfirmSignupAdministratorController;
//# sourceMappingURL=administrator-confirm-signup-factory.js.map