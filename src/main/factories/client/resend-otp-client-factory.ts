import { ResendOTPUserController } from '../../../apresentation/controllers/user/resend-otp-client/resend-otp-client-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { EmailValidation } from '../../../apresentation/validations/email-validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbResendOtpUser } from '../../../data/usecases/user/db-resend-otp-client';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/user-sequelize-adpter';
import { SendEmailSignupClientDecorator } from '../../decorators/send-email-decorator';
import { EmailValidationAdapter } from '../../utils/email-validation-adapter';
import { GenerateOtpAdapter } from '../../utils/generate-otp-adpater';
import { SendEmailAdapter } from '../../utils/send-email';

export const makeResendOtpUserController = (): Controller => {
  //1 - adapters
  const getAccountUserByEmailRepository = new ClientSequelizeAdapter();
  const generateOTP = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();

  //2 - usecases

  const resendOtpClient = new DbResendOtpUser(getAccountUserByEmailRepository, generateOTP);

  //3 - validations
  const validations: Validation[] = [];
  for (const field of ['email']) {
    validations.push(new RequestFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));

  const validationComposite = new ValidationComposite(validations);

  const resendOtpClientController = new ResendOTPUserController(validationComposite, resendOtpClient);

  return new SendEmailSignupClientDecorator(resendOtpClientController, sendEmailAdapter);
};
