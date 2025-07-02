import { ResendOTPOwnerController } from '../../../apresentation/controllers/owner/resend-otp-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { EmailValidation } from '../../../apresentation/validations/email-validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbResendOtpOwner } from '../../../data/usecases/owner/db-resend-otp-owner';
import { OwnerSequelizeAdapter } from '../../../infraestruture/database/owner-sequelize-adapter';
import { SendEmailSignupClientDecorator } from '../../decorators/send-email-decorator';
import { EmailValidationAdapter } from '../../utils/email-validation-adapter';
import { GenerateOtpAdapter } from '../../utils/generate-otp-adpater';
import { SendEmailAdapter } from '../../utils/send-email';

export const makeResendOtpOwnerController = (): Controller => {
  //1 - adapters
  const getAccountOwnerByEmailRepository = new OwnerSequelizeAdapter();
  const generateOTP = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();

  //2 - usecases

  const resendOtpOwner = new DbResendOtpOwner(getAccountOwnerByEmailRepository, generateOTP);

  //3 - validations
  const validations: Validation[] = [];
  for (const field of ['email']) {
    validations.push(new RequestFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));

  const validationComposite = new ValidationComposite(validations);

  const resendOtpOwnerController = new ResendOTPOwnerController(validationComposite, resendOtpOwner);

  return new SendEmailSignupClientDecorator(resendOtpOwnerController, sendEmailAdapter);
}; 