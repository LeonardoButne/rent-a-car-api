"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResendOtpOwnerController = void 0;
const resend_otp_owner_controller_1 = require("../../../apresentation/controllers/owner/resend-otp-owner-controller");
const email_validation_1 = require("../../../apresentation/validations/email-validation");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_resend_otp_owner_1 = require("../../../data/usecases/owner/db-resend-otp-owner");
const owner_sequelize_adapter_1 = require("../../../infraestruture/database/owner-sequelize-adapter");
const send_email_decorator_1 = require("../../decorators/send-email-decorator");
const email_validation_adapter_1 = require("../../utils/email-validation-adapter");
const generate_otp_adpater_1 = require("../../utils/generate-otp-adpater");
const send_email_1 = require("../../utils/send-email");
const makeResendOtpOwnerController = () => {
    //1 - adapters
    const getAccountOwnerByEmailRepository = new owner_sequelize_adapter_1.OwnerSequelizeAdapter();
    const generateOTP = new generate_otp_adpater_1.GenerateOtpAdapter();
    const sendEmailAdapter = new send_email_1.SendEmailAdapter();
    //2 - usecases
    const resendOtpOwner = new db_resend_otp_owner_1.DbResendOtpOwner(getAccountOwnerByEmailRepository, generateOTP);
    //3 - validations
    const validations = [];
    for (const field of ['email']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    validations.push(new email_validation_1.EmailValidation('email', new email_validation_adapter_1.EmailValidationAdapter()));
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const resendOtpOwnerController = new resend_otp_owner_controller_1.ResendOTPOwnerController(validationComposite, resendOtpOwner);
    return new send_email_decorator_1.SendEmailSignupClientDecorator(resendOtpOwnerController, sendEmailAdapter);
};
exports.makeResendOtpOwnerController = makeResendOtpOwnerController;
//# sourceMappingURL=resend-otp-owner-factory.js.map