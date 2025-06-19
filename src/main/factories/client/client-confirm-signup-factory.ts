import { ConfirmSignupUserController } from "../../../apresentation/controllers/user/connfirm-signup-user/confirm-signup-user-controller";
import { Controller } from "../../../apresentation/protocols";
import { RequestFieldValidation } from "../../../apresentation/validations/request-field-validation";
import { ValidationComposite } from "../../../apresentation/validations/validation-composite";
import { DbConfirmSignupUser } from "../../../data/usecases/user/db-confirm-signup-client";
import { DbGetAccountUserByEmail } from "../../../data/usecases/user/db-get-account-client-by-email";
import { ClientSequelizeAdapter } from "../../../infraestruture/database/user-sequelize-adpter";
import { VerifyOtpAdapter } from "../../utils/verify-otp-adapter";


export const makeConfirmSignupUserController = (): Controller => {
  const userRepository = new ClientSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();

  const getAccountByEmail = new DbGetAccountUserByEmail(userRepository);
  const confirmSignupUser = new DbConfirmSignupUser(verifyOtpAdapter, userRepository);

  const validations = new ValidationComposite([
    new RequestFieldValidation('email'),
    new RequestFieldValidation('otp')
  ]);

  return new ConfirmSignupUserController(
    validations,
    getAccountByEmail,
    confirmSignupUser
  );
};
