"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfirmSignupUserController = void 0;
const confirm_signup_client_controller_1 = require("../../../apresentation/controllers/client/confirm-signup-client-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_confirm_signup_client_1 = require("../../../data/usecases/user/db-confirm-signup-client");
const db_get_account_client_by_email_1 = require("../../../data/usecases/user/db-get-account-client-by-email");
const user_sequelize_adapter_1 = require("../../../infraestruture/database/user-sequelize-adapter");
const verify_otp_adapter_1 = require("../../utils/verify-otp-adapter");
const makeConfirmSignupUserController = () => {
    const clientRepository = new user_sequelize_adapter_1.ClientSequelizeAdapter();
    const verifyOtpAdapter = new verify_otp_adapter_1.VerifyOtpAdapter();
    const getAccountByEmail = new db_get_account_client_by_email_1.DbGetAccountUserByEmail(clientRepository);
    const confirmSignupUser = new db_confirm_signup_client_1.DbConfirmSignupUser(verifyOtpAdapter, clientRepository);
    const validations = new validation_composite_1.ValidationComposite([
        new request_field_validation_1.RequestFieldValidation('email'),
        new request_field_validation_1.RequestFieldValidation('otp')
    ]);
    return new confirm_signup_client_controller_1.ConfirmSignupUserController(validations, getAccountByEmail, confirmSignupUser);
};
exports.makeConfirmSignupUserController = makeConfirmSignupUserController;
//# sourceMappingURL=client-confirm-signup-factory.js.map