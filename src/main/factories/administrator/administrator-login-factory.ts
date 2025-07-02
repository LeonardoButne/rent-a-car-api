import { LoginAdministratorController } from '../../../apresentation/controllers/administrator/login-administrator-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbAuthenticateAdministrator } from '../../../data/usecases/administrator/db-login-administrator';
import { AuthenticateAdministrator } from '../../../domain/usecases/administrator-usecases/login-administrator-usecase';
import { BcryptAdapter } from '../../../infraestruture/cryptograph/encrypty/bcrypt-adapter';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';
import { SendEmailSignupClientDecorator } from '../../decorators/send-email-decorator';
import { GenerateOtpAdapter } from '../../utils/generate-otp-adpater';
import { SendEmailAdapter } from '../../utils/send-email';

export const makeLoginAdministratorController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const generateOtp = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();

  const authenticateAdministrator: AuthenticateAdministrator = new DbAuthenticateAdministrator(adminRepository, bcryptAdapter, generateOtp);

  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequestFieldValidation(field));
  }
  const validationComposite = new ValidationComposite(validations);

  const loginAdministratorController = new LoginAdministratorController(validationComposite, authenticateAdministrator);

  return new SendEmailSignupClientDecorator(loginAdministratorController, sendEmailAdapter);

}; 