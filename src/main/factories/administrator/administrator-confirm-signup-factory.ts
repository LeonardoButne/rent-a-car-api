import { ConfirmSignupAdministratorController } from "../../../apresentation/controllers/administrator/confirm-signup-administrator-controller";
import { Controller } from "../../../apresentation/protocols";
import { RequestFieldValidation } from "../../../apresentation/validations/request-field-validation";
import { ValidationComposite } from "../../../apresentation/validations/validation-composite";
import { DbConfirmSignupAdministrator } from "../../../data/usecases/administrator/db-confirm-signup-administrator";
import { AdministratorSequelizeAdapter } from "../../../infraestruture/database/administrator-sequelize-adapter";
import { VerifyOtpAdapter } from "../../utils/verify-otp-adapter";

export const makeConfirmSignupAdministratorController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();

  const confirmSignupAdministrator = new DbConfirmSignupAdministrator(verifyOtpAdapter, adminRepository);

  const validations = new ValidationComposite([
    new RequestFieldValidation('email'),
    new RequestFieldValidation('otp')
  ]);

  return new ConfirmSignupAdministratorController(
    validations,
    adminRepository,
    confirmSignupAdministrator
  );
}; 