"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignupUserController = void 0;
const signup_client_controler_1 = require("../../../apresentation/controllers/client/signup-client-controler");
const compare_field_validation_1 = require("../../../apresentation/validations/compare-field-validation");
const email_validation_1 = require("../../../apresentation/validations/email-validation");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_signup_client_1 = require("../../../data/usecases/user/db-signup-client");
const bcrypt_adapter_1 = require("../../../infraestruture/cryptograph/encrypty/bcrypt-adapter");
const user_sequelize_adapter_1 = require("../../../infraestruture/database/user-sequelize-adapter");
const send_email_decorator_1 = require("../../decorators/send-email-decorator");
const email_validation_adapter_1 = require("../../utils/email-validation-adapter");
const generate_otp_adpater_1 = require("../../utils/generate-otp-adpater");
const generate_secret_adapter_1 = require("../../utils/generate-secret-adapter");
const send_email_1 = require("../../utils/send-email");
const makeSignupUserController = () => {
    const salt = 12;
    const cryptoAdapter = new bcrypt_adapter_1.BcryptAdapter(salt);
    const generateSecretAdapter = new generate_secret_adapter_1.GenarateSecretAdapter();
    const userRepository = new user_sequelize_adapter_1.ClientSequelizeAdapter();
    const generateOtpAdapter = new generate_otp_adpater_1.GenerateOtpAdapter();
    const sendEmailAdapter = new send_email_1.SendEmailAdapter();
    const signupUser = new db_signup_client_1.DbSignupUser(cryptoAdapter, generateSecretAdapter, userRepository, generateOtpAdapter);
    const validations = [];
    for (const field of ['name', 'lastName', 'email', 'password', 'passwordConfirm', 'telephone']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    validations.push(new compare_field_validation_1.CompareFieldValidation('password', 'passwordConfirm'));
    validations.push(new email_validation_1.EmailValidation('email', new email_validation_adapter_1.EmailValidationAdapter()));
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const controller = new signup_client_controler_1.SignupClientController(validationComposite, signupUser);
    return new send_email_decorator_1.SendEmailSignupClientDecorator(controller, sendEmailAdapter);
};
exports.makeSignupUserController = makeSignupUserController;
//# sourceMappingURL=client-signup-factory.js.map