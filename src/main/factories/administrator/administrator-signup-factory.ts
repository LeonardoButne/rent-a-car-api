import { SignupAdministratorController } from "../../../apresentation/controllers/administrator/signup-administrator-controller";
import { Controller } from "../../../apresentation/protocols";
import { Validation } from "../../../apresentation/protocols/validation";
import { CompareFieldValidation } from "../../../apresentation/validations/compare-field-validation";
import { EmailValidation } from "../../../apresentation/validations/email-validation";
import { RequestFieldValidation } from "../../../apresentation/validations/request-field-validation";
import { ValidationComposite } from "../../../apresentation/validations/validation-composite";
import { DbSignupAdministrator } from "../../../data/usecases/administrator/db-signup-administrator";
import { BcryptAdapter } from "../../../infraestruture/cryptograph/encrypty/bcrypt-adapter";
import { AdministratorSequelizeAdapter } from "../../../infraestruture/database/administrator-sequelize-adapter";
import { SendEmailSignupClientDecorator } from "../../decorators/send-email-decorator";
import { EmailValidationAdapter } from "../../utils/email-validation-adapter";
import { GenerateOtpAdapter } from "../../utils/generate-otp-adpater";
import { GenarateSecretAdapter } from "../../utils/generate-secret-adapter";
import { SendEmailAdapter } from "../../utils/send-email";

export const makeSignupAdministratorController = (): Controller => {
  const salt = 12;
  const cryptoAdapter = new BcryptAdapter(salt);
  const generateSecretAdapter = new GenarateSecretAdapter();
  const adminRepository = new AdministratorSequelizeAdapter();
  const generateOtpAdapter = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();


  const signupAdministrator = new DbSignupAdministrator(
    cryptoAdapter,
    generateSecretAdapter,
    adminRepository,
    generateOtpAdapter
  );

  const validations: Validation[] = [];
  for (const field of ['userName','email', 'password', 'passwordConfirm']) {
    validations.push(new RequestFieldValidation(field));
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirm'));
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));

  const validationComposite = new ValidationComposite(validations);

  const signupAdministratorController = new SignupAdministratorController(validationComposite, signupAdministrator)

  return new SendEmailSignupClientDecorator(signupAdministratorController, sendEmailAdapter);


}; 