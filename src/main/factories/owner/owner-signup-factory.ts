import { SignupOwnerController } from "../../../apresentation/controllers/owner/signup-owner-controller";
import { Controller } from "../../../apresentation/protocols";
import { Validation } from "../../../apresentation/protocols/validation";
import { CompareFieldValidation } from "../../../apresentation/validations/compare-field-validation";
import { EmailValidation } from "../../../apresentation/validations/email-validation";
import { RequestFieldValidation } from "../../../apresentation/validations/request-field-validation";
import { ValidationComposite } from "../../../apresentation/validations/validation-composite";
import { DbSignupOwner } from "../../../data/usecases/owner/db-signup-owner";
import { BcryptAdapter } from "../../../infraestruture/cryptograph/encrypty/bcrypt-adapter";
import { OwnerSequelizeAdapter } from "../../../infraestruture/database/owner-sequelize-adapter";
import { SendEmailSignupClientDecorator } from "../../decorators/send-email-decorator";
import { EmailValidationAdapter } from "../../utils/email-validation-adapter";
import { GenerateOtpAdapter } from "../../utils/generate-otp-adpater";
import { GenarateSecretAdapter } from "../../utils/generate-secret-adapter";
import { SendEmailAdapter } from "../../utils/send-email";

export const makeSignupOwnerController = (): Controller => {
  const salt = 12;
  const cryptoAdapter = new BcryptAdapter(salt);
  const generateSecretAdapter = new GenarateSecretAdapter();
  const ownerRepository = new OwnerSequelizeAdapter();
  const generateOtpAdapter = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();

  const signupOwner = new DbSignupOwner(
    cryptoAdapter,
    generateSecretAdapter,
    ownerRepository,
    generateOtpAdapter,
    sendEmailAdapter
  );

  const validations: Validation[] = [];

  for (const field of ['name','lastName',"address",'email', 'password', 'passwordConfirm', 'telephone']) {
    validations.push(new RequestFieldValidation(field));
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirm'));
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));

  const validationComposite = new ValidationComposite(validations);

  const controller = new SignupOwnerController(validationComposite, signupOwner);
  return new SendEmailSignupClientDecorator(controller, sendEmailAdapter);
}; 