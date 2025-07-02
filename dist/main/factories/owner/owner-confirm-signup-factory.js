"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfirmSignupOwnerController = void 0;
const confirm_signup_owner_controller_1 = require("../../../apresentation/controllers/owner/confirm-signup-owner-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_confirm_signup_owner_1 = require("../../../data/usecases/owner/db-confirm-signup-owner");
const db_get_account_owner_by_email_1 = require("../../../data/usecases/owner/db-get-account-owner-by-email");
const owner_sequelize_adapter_1 = require("../../../infraestruture/database/owner-sequelize-adapter");
const verify_otp_adapter_1 = require("../../utils/verify-otp-adapter");
const makeConfirmSignupOwnerController = () => {
    const ownerRepository = new owner_sequelize_adapter_1.OwnerSequelizeAdapter();
    const verifyOtpAdapter = new verify_otp_adapter_1.VerifyOtpAdapter();
    const getAccountByEmail = new db_get_account_owner_by_email_1.DbGetAccountOwnerByEmail(ownerRepository);
    const confirmSignupOwner = new db_confirm_signup_owner_1.DbConfirmSignupOwner(verifyOtpAdapter, ownerRepository);
    const validations = new validation_composite_1.ValidationComposite([
        new request_field_validation_1.RequestFieldValidation('email'),
        new request_field_validation_1.RequestFieldValidation('otp')
    ]);
    return new confirm_signup_owner_controller_1.ConfirmSignupOwnerController(validations, getAccountByEmail, confirmSignupOwner);
};
exports.makeConfirmSignupOwnerController = makeConfirmSignupOwnerController;
//# sourceMappingURL=owner-confirm-signup-factory.js.map