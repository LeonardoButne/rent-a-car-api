import { ConfirmSignupUserController } from '../../apresentation/controllers/confirm-signup-user-controller';
import { Controller } from '../../apresentation/protocols';
import { RequestFieldValidation } from '../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../apresentation/validations/validation-composite';
import { DbConfirmSignupUser } from '../../data/usecases/db-confirm-signup-user';
import { ClientSequelizeAdapter } from '../../infraestruture/database/client-sequelize-adapter';
import { OwnerSequelizeAdapter } from '../../infraestruture/database/owner-sequelize-adapter';
import { DeviceSequelizeAdapter } from '../../infraestruture/database/device-sequelize-adapter';
import { VerifyOtpAdapter } from '../utils/verify-otp-adapter';
import { JwtAdapter } from '../../infraestruture/cryptograph/jwt/jwt-adpter';

export const makeConfirmSignupUserController = (): Controller => {
  const clientRepository = new ClientSequelizeAdapter();
  const ownerRepository = new OwnerSequelizeAdapter();
  const deviceRepository = new DeviceSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  const confirmSignupUserUsecase = new DbConfirmSignupUser(
    clientRepository,
    ownerRepository,
    deviceRepository,
    verifyOtpAdapter,
    jwtAdapter
  );

  const validations = new ValidationComposite([
    new RequestFieldValidation('email'),
    new RequestFieldValidation('otp'),
  ]);

  return new ConfirmSignupUserController(validations, confirmSignupUserUsecase);
};
