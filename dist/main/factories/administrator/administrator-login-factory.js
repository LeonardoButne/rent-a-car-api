"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginAdministratorController = void 0;
const login_administrator_controller_1 = require("../../../apresentation/controllers/administrator/login-administrator-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_login_administrator_1 = require("../../../data/usecases/administrator/db-login-administrator");
const bcrypt_adapter_1 = require("../../../infraestruture/cryptograph/encrypty/bcrypt-adapter");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const send_email_decorator_1 = require("../../decorators/send-email-decorator");
const generate_otp_adpater_1 = require("../../utils/generate-otp-adpater");
const send_email_1 = require("../../utils/send-email");
const makeLoginAdministratorController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter();
    const generateOtp = new generate_otp_adpater_1.GenerateOtpAdapter();
    const sendEmailAdapter = new send_email_1.SendEmailAdapter();
    const authenticateAdministrator = new db_login_administrator_1.DbAuthenticateAdministrator(adminRepository, bcryptAdapter, generateOtp);
    const validations = [];
    for (const field of ['email', 'password']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const loginAdministratorController = new login_administrator_controller_1.LoginAdministratorController(validationComposite, authenticateAdministrator);
    return new send_email_decorator_1.SendEmailSignupClientDecorator(loginAdministratorController, sendEmailAdapter);
};
exports.makeLoginAdministratorController = makeLoginAdministratorController;
//# sourceMappingURL=administrator-login-factory.js.map