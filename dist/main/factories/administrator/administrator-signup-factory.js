"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignupAdministratorController = void 0;
const signup_administrator_controller_1 = require("../../../apresentation/controllers/administrator/signup-administrator-controller");
const compare_field_validation_1 = require("../../../apresentation/validations/compare-field-validation");
const email_validation_1 = require("../../../apresentation/validations/email-validation");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_signup_administrator_1 = require("../../../data/usecases/administrator/db-signup-administrator");
const bcrypt_adapter_1 = require("../../../infraestruture/cryptograph/encrypty/bcrypt-adapter");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const send_email_decorator_1 = require("../../decorators/send-email-decorator");
const email_validation_adapter_1 = require("../../utils/email-validation-adapter");
const generate_otp_adpater_1 = require("../../utils/generate-otp-adpater");
const generate_secret_adapter_1 = require("../../utils/generate-secret-adapter");
const send_email_1 = require("../../utils/send-email");
const makeSignupAdministratorController = () => {
    const salt = 12;
    const cryptoAdapter = new bcrypt_adapter_1.BcryptAdapter(salt);
    const generateSecretAdapter = new generate_secret_adapter_1.GenarateSecretAdapter();
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const generateOtpAdapter = new generate_otp_adpater_1.GenerateOtpAdapter();
    const sendEmailAdapter = new send_email_1.SendEmailAdapter();
    const signupAdministrator = new db_signup_administrator_1.DbSignupAdministrator(cryptoAdapter, generateSecretAdapter, adminRepository, generateOtpAdapter);
    const validations = [];
    for (const field of ['userName', 'email', 'password', 'passwordConfirm']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    validations.push(new compare_field_validation_1.CompareFieldValidation('password', 'passwordConfirm'));
    validations.push(new email_validation_1.EmailValidation('email', new email_validation_adapter_1.EmailValidationAdapter()));
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const signupAdministratorController = new signup_administrator_controller_1.SignupAdministratorController(validationComposite, signupAdministrator);
    return new send_email_decorator_1.SendEmailSignupClientDecorator(signupAdministratorController, sendEmailAdapter);
};
exports.makeSignupAdministratorController = makeSignupAdministratorController;
//# sourceMappingURL=administrator-signup-factory.js.map