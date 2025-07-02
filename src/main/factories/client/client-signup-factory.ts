import { SignupClientController } from '../../../apresentation/controllers/client/signup-client-controler';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { CompareFieldValidation } from '../../../apresentation/validations/compare-field-validation';
import { EmailValidation } from '../../../apresentation/validations/email-validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbSignupUser } from '../../../data/usecases/client/db-signup-client';
import { BcryptAdapter } from '../../../infraestruture/cryptograph/encrypty/bcrypt-adapter';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/client-sequelize-adapter';
import { SendEmailSignupClientDecorator } from '../../decorators/send-email-decorator';
import { EmailValidationAdapter } from '../../utils/email-validation-adapter';
import { GenerateOtpAdapter } from '../../utils/generate-otp-adpater';
import { GenarateSecretAdapter } from '../../utils/generate-secret-adapter';
import { SendEmailAdapter } from '../../utils/send-email';

export const makeSignupUserController = (): Controller => {
  const salt = 12;
  const cryptoAdapter = new BcryptAdapter(salt);
  const generateSecretAdapter = new GenarateSecretAdapter();
  const userRepository = new ClientSequelizeAdapter();
  const generateOtpAdapter = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();

  const signupUser = new DbSignupUser(cryptoAdapter, generateSecretAdapter, userRepository, generateOtpAdapter);

  const validations: Validation[] = [];

  for (const field of ['name', 'lastName', 'email', 'password', 'passwordConfirm', 'telephone']) {
    validations.push(new RequestFieldValidation(field));
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirm'));
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));

  const validationComposite = new ValidationComposite(validations);

  const controller = new SignupClientController(validationComposite, signupUser);
  return new SendEmailSignupClientDecorator(controller, sendEmailAdapter);
};
