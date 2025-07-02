import { VerifyOtpLoginOwnerController } from '../../../apresentation/controllers/owner/verify-otp-login-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { EmailValidation } from '../../../apresentation/validations/email-validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbVerifyOtpLoginOwner } from '../../../data/usecases/owner/db-verify-otp-login-owner';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';
import { OwnerSequelizeAdapter } from '../../../infraestruture/database/owner-sequelize-adapter';
import { EmailValidationAdapter } from '../../utils/email-validation-adapter';
import { VerifyOtpAdapter } from '../../utils/verify-otp-adapter';

export const makeVerifyLoginOwnerOtpController = (): Controller => {
  // 1 - Infrastructure layer (adapters/repos)

  const ownerRepository = new OwnerSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  // 2 - Use Case layer (domain logic)

  const verifyOtpLoginUseCase = new DbVerifyOtpLoginOwner(ownerRepository, verifyOtpAdapter, jwtAdapter);

  // 3 - Validation layer
  const validations: Validation[] = [];

  for (const field of ['otp', 'email']) {
    validations.push(new RequestFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidationAdapter()));
  const validationComposite = new ValidationComposite(validations);

  // 4️⃣ Controller layer
  return new VerifyOtpLoginOwnerController(validationComposite, verifyOtpLoginUseCase);
}; 