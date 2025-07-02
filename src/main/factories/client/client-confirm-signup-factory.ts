import { ConfirmSignupUserController } from '../../../apresentation/controllers/client/confirm-signup-client-controller';
import { Controller } from '../../../apresentation/protocols';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbConfirmSignupUser } from '../../../data/usecases/client/db-confirm-signup-client';
import { DbGetAccountUserByEmail } from '../../../data/usecases/client/db-get-account-client-by-email';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/client-sequelize-adapter';
import { VerifyOtpAdapter } from '../../utils/verify-otp-adapter';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';

export const makeConfirmSignupUserController = (): Controller => {
  const clientRepository = new ClientSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  const getAccountByEmail = new DbGetAccountUserByEmail(clientRepository);
  const confirmSignupUser = new DbConfirmSignupUser(verifyOtpAdapter, clientRepository, jwtAdapter);

  const validations = new ValidationComposite([new RequestFieldValidation('email'), new RequestFieldValidation('otp')]);

  return new ConfirmSignupUserController(validations, getAccountByEmail, confirmSignupUser);
};
