import { ResendOtpUserController } from '../../apresentation/controllers/resend-otp-user-controller';
import { ValidationComposite } from '../../apresentation/validations/validation-composite';
import { RequiredFieldValidation } from '../../apresentation/validations/required-field-validation';
import { DbResendOtpUser } from '../../data/usecases/db-resend-otp-user';
import { ClientSequelizeAdapter } from '../../infraestruture/database/client-sequelize-adapter';
import { OwnerSequelizeAdapter } from '../../infraestruture/database/owner-sequelize-adapter';
import { GenerateOtpAdapter } from '../utils/generate-otp-adpater';
import { SendEmailAdapter } from '../utils/send-email';

export const makeResendOtpUserController = () => {
  const validations = [];
  for (const field of ['email']) {
    validations.push(new RequiredFieldValidation(field));
  }
  const validationComposite = new ValidationComposite(validations);

  const clientRepository = new ClientSequelizeAdapter();
  const ownerRepository = new OwnerSequelizeAdapter();
  const generateOtp = new GenerateOtpAdapter();
  const sendEmail = new SendEmailAdapter();

  const resendOtpUserUsecase = new DbResendOtpUser(
    clientRepository,
    ownerRepository,
    generateOtp,
    sendEmail
  );

  return new ResendOtpUserController(validationComposite, resendOtpUserUsecase);
}; 