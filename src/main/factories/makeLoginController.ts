import { LoginController } from '../../apresentation/controllers/login-controller';
import { ValidationComposite } from '../../apresentation/validations/validation-composite';
import { RequiredFieldValidation } from '../../apresentation/validations/required-field-validation';
import { DbAuthenticateUser } from '../../data/usecases/db-authenticate-user';
import { ClientSequelizeAdapter } from '../../infraestruture/database/client-sequelize-adapter';
import { OwnerSequelizeAdapter } from '../../infraestruture/database/owner-sequelize-adapter';
import { BcryptAdapter } from '../../infraestruture/cryptograph/encrypty/bcrypt-adapter';
import { JwtAdapter } from '../../infraestruture/cryptograph/jwt/jwt-adpter';
import { DeviceSequelizeAdapter } from '../../infraestruture/database/device-sequelize-adapter';
import { GenerateOtpAdapter } from '../utils/generate-otp-adpater';
import { SendEmailAdapter } from '../utils/send-email';
import { Validation } from '../../apresentation/protocols/validation';
import { RequestFieldValidation } from '../../apresentation/validations/request-field-validation';

export const makeLoginController = () => {
    const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequestFieldValidation(field));
  }
  const validationComposite = new ValidationComposite(validations);

  const clientRepository = new ClientSequelizeAdapter();
  const ownerRepository = new OwnerSequelizeAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);
  const deviceRepository = new DeviceSequelizeAdapter();
  const generateOtp = new GenerateOtpAdapter();
  const sendEmail = new SendEmailAdapter();

  const authenticateUser = new DbAuthenticateUser(
    clientRepository,
    ownerRepository,
    bcryptAdapter,
    jwtAdapter,
    deviceRepository,
    generateOtp,
    sendEmail
  );

  return new LoginController(validationComposite, authenticateUser);
}; 