"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResendOtpUserController = void 0;
const resend_otp_client_controller_1 = require("../../../apresentation/controllers/client/resend-otp-client-controller");
const email_validation_1 = require("../../../apresentation/validations/email-validation");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_resend_otp_client_1 = require("../../../data/usecases/user/db-resend-otp-client");
const user_sequelize_adapter_1 = require("../../../infraestruture/database/user-sequelize-adapter");
const send_email_decorator_1 = require("../../decorators/send-email-decorator");
const email_validation_adapter_1 = require("../../utils/email-validation-adapter");
const generate_otp_adpater_1 = require("../../utils/generate-otp-adpater");
const send_email_1 = require("../../utils/send-email");
const makeResendOtpUserController = () => {
    //1 - adapters
    const getAccountUserByEmailRepository = new user_sequelize_adapter_1.ClientSequelizeAdapter();
    const generateOTP = new generate_otp_adpater_1.GenerateOtpAdapter();
    const sendEmailAdapter = new send_email_1.SendEmailAdapter();
    //2 - usecases
    const resendOtpClient = new db_resend_otp_client_1.DbResendOtpUser(getAccountUserByEmailRepository, generateOTP);
    //3 - validations
    const validations = [];
    for (const field of ['email']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    validations.push(new email_validation_1.EmailValidation('email', new email_validation_adapter_1.EmailValidationAdapter()));
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const resendOtpClientController = new resend_otp_client_controller_1.ResendOTPUserController(validationComposite, resendOtpClient);
    return new send_email_decorator_1.SendEmailSignupClientDecorator(resendOtpClientController, sendEmailAdapter);
};
exports.makeResendOtpUserController = makeResendOtpUserController;
//# sourceMappingURL=resend-otp-client-factory.js.map