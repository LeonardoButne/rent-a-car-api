"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginClientController = void 0;
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_authenticate_client_1 = require("../../../data/usecases/user/db-authenticate-client");
const bcrypt_adapter_1 = require("../../../infraestruture/cryptograph/encrypty/bcrypt-adapter");
const user_sequelize_adapter_1 = require("../../../infraestruture/database/user-sequelize-adapter");
const send_email_decorator_1 = require("../../decorators/send-email-decorator");
const generate_otp_adpater_1 = require("../../utils/generate-otp-adpater");
const send_email_1 = require("../../utils/send-email");
const jwt_adpter_1 = require("../../../infraestruture/cryptograph/jwt/jwt-adpter");
const login_client_controller_1 = require("../../../apresentation/controllers/client/login-client-controller");
const makeLoginClientController = () => {
    // 1 - Infra - Adapters
    const clientRepository = new user_sequelize_adapter_1.ClientSequelizeAdapter();
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter();
    const generateOtp = new generate_otp_adpater_1.GenerateOtpAdapter();
    const sendEmailAdapter = new send_email_1.SendEmailAdapter();
    const jwtAdapter = new jwt_adpter_1.JwtAdapter(process.env.JWTSECRET_KEY);
    // 2 - UseCase - Domínio
    const authenticateClient = new db_authenticate_client_1.DbAuthenticateClient(clientRepository, bcryptAdapter, generateOtp);
    // 3 - Validations
    const validations = [];
    for (const field of ['email', 'password']) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    // 4 - Controller com todas as dependências
    const loginClientController = new login_client_controller_1.LoginClientController(validationComposite, authenticateClient);
    return new send_email_decorator_1.SendEmailSignupClientDecorator(loginClientController, sendEmailAdapter);
};
exports.makeLoginClientController = makeLoginClientController;
//# sourceMappingURL=makeLoginClientController.js.map