import { VerifyOtpLoginClientController } from '../../../apresentation/controllers/user/login-client/verify-otp-login-user-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { EmailValidation } from '../../../apresentation/validations/email-validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbVerifyOtpLogin } from '../../../data/usecases/user/db-verify-otp-login';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/user-sequelize-adpter';
import { EmailValidationAdapter } from '../../utils/email-validation-adapter';
import { VerifyOtpAdapter } from '../../utils/verify-otp-adapter';

export const makeVerifyLoginClientOtpController = (): Controller => {
  // 1 - Infrastructure layer (adapters/repos)

  const clientRepository = new ClientSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  // 2 - Use Case layer (domain logic)

  const verifyOtpLoginUseCase = new DbVerifyOtpLogin(clientRepository, verifyOtpAdapter, jwtAdapter);

  // 3 - Validation layer
  const validations: Validation[] = [];

  for (const field of ['otp', 'email']) {
    validations.push(new RequestFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidationAdapter()));
  const validationComposite = new ValidationComposite(validations);

  // 4️⃣ Controller layer
  return new VerifyOtpLoginClientController(validationComposite, verifyOtpLoginUseCase);
};
