import { ConfirmSignupOwnerController } from "../../../apresentation/controllers/owner/confirm-signup-owner-controller";
import { Controller } from "../../../apresentation/protocols";
import { RequestFieldValidation } from "../../../apresentation/validations/request-field-validation";
import { ValidationComposite } from "../../../apresentation/validations/validation-composite";
import { DbConfirmSignupOwner } from "../../../data/usecases/owner/db-confirm-signup-owner";
import { DbGetAccountOwnerByEmail } from "../../../data/usecases/owner/db-get-account-owner-by-email";
import { OwnerSequelizeAdapter } from "../../../infraestruture/database/owner-sequelize-adapter";
import { VerifyOtpAdapter } from "../../utils/verify-otp-adapter";
import { JwtAdapter } from "../../../infraestruture/cryptograph/jwt/jwt-adpter";

export const makeConfirmSignupOwnerController = (): Controller => {
  const ownerRepository = new OwnerSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  const getAccountByEmail = new DbGetAccountOwnerByEmail(ownerRepository);
  const confirmSignupOwner = new DbConfirmSignupOwner(verifyOtpAdapter, ownerRepository, jwtAdapter);

  const validations = new ValidationComposite([
    new RequestFieldValidation('email'),
    new RequestFieldValidation('otp')
  ]);

  return new ConfirmSignupOwnerController(
    validations,
    getAccountByEmail,
    confirmSignupOwner
  );
}; 