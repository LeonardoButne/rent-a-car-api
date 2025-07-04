import { VerifyOtpLoginClientController } from '../../../apresentation/controllers/client/verify-otp-login-client-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { EmailValidation } from '../../../apresentation/validations/email-validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { RequiredFieldValidation } from '../../../apresentation/validations/required-field-validation';
import { DbVerifyOtpLogin } from '../../../data/usecases/client/db-verify-otp-login';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/client-sequelize-adapter';
import { EmailValidationAdapter } from '../../utils/email-validation-adapter';
import { VerifyOtpAdapter } from '../../utils/verify-otp-adapter';
import { DeviceSequelizeAdapter } from '../../../infraestruture/database/device-sequelize-adapter';

export const makeVerifyLoginClientOtpController = (): Controller => {
  // 1 - Infrastructure layer (adapters/repos)

  const clientRepository = new ClientSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);
  const deviceRepository = new DeviceSequelizeAdapter();

  // 2 - Use Case layer (domain logic)

  const verifyOtpLoginUseCase = new DbVerifyOtpLogin(
    clientRepository,
    verifyOtpAdapter,
    jwtAdapter,
    deviceRepository
  );

  // 3 - Validation layer
  const validations: Validation[] = [];

  for (const field of ['otp', 'email']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidationAdapter()));
  const validationComposite = new ValidationComposite(validations);

  // 4️⃣ Controller layer
  return new VerifyOtpLoginClientController(validationComposite, verifyOtpLoginUseCase);
};
