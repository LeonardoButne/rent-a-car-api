import { VerifyOtpLoginAdministratorController } from '../../../apresentation/controllers/administrator/verify-otp-login-administrator-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { EmailValidation } from '../../../apresentation/validations/email-validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbVerifyOtpLoginAdministrator } from '../../../data/usecases/administrator/db-verify-otp-login-administrator';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';
import { EmailValidationAdapter } from '../../utils/email-validation-adapter';
import { VerifyOtpAdapter } from '../../utils/verify-otp-adapter';

export const makeVerifyOtpLoginAdministratorController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  const verifyOtpLoginUseCase = new DbVerifyOtpLoginAdministrator(adminRepository, verifyOtpAdapter, jwtAdapter);

  const validations: Validation[] = [];
  for (const field of ['otp', 'email']) {
    validations.push(new RequestFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));
  const validationComposite = new ValidationComposite(validations);

  return new VerifyOtpLoginAdministratorController(validationComposite, verifyOtpLoginUseCase);
}; 