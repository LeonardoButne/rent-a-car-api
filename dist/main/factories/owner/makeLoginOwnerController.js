"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginOwnerController = void 0;
const login_owner_controller_1 = require("../../../apresentation/controllers/owner/login-owner-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_authenticate_owner_1 = require("../../../data/usecases/owner/db-authenticate-owner");
const bcrypt_adapter_1 = require("../../../infraestruture/cryptograph/encrypty/bcrypt-adapter");
const owner_sequelize_adapter_1 = require("../../../infraestruture/database/owner-sequelize-adapter");
const send_email_decorator_1 = require("../../decorators/send-email-decorator");
const generate_otp_adpater_1 = require("../../utils/generate-otp-adpater");
const send_email_1 = require("../../utils/send-email");
const jwt_adpter_1 = require("../../../infraestruture/cryptograph/jwt/jwt-adpter");
const makeLoginOwnerController = () => {
    // 1 - Infra - Adapters
    const ownerRepository = new owner_sequelize_adapter_1.OwnerSequelizeAdapter();
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter();
    const generateOtp = new generate_otp_adpater_1.GenerateOtpAdapter();
    const sendEmailAdapter = new send_email_1.SendEmailAdapter();
    const jwtAdapter = new jwt_adpter_1.JwtAdapter(process.env.JWTSECRET_KEY);
    // 2 - UseCase - Domínio
    const authenticateOwner = new db_authenticate_owner_1.DbAuthenticateOwner(ownerRepository, bcryptAdapter, generateOtp);
    // 3 - Validations
    const validations = [];
    for (const field of ['email', 'password']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    // 4 - Controller com todas as dependências
    const loginOwnerController = new login_owner_controller_1.LoginOwnerController(validationComposite, authenticateOwner);
    return new send_email_decorator_1.SendEmailSignupClientDecorator(loginOwnerController, sendEmailAdapter);
};
exports.makeLoginOwnerController = makeLoginOwnerController;
//# sourceMappingURL=makeLoginOwnerController.js.map