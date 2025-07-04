import { VerifyOtpLoginUserController } from '../../apresentation/controllers/verify-otp-login-user-controller';
import { ValidationComposite } from '../../apresentation/validations/validation-composite';
import { RequiredFieldValidation } from '../../apresentation/validations/required-field-validation';
import { EmailValidation } from '../../apresentation/validations/email-validation';
import { DbVerifyOtpLoginUser } from '../../data/usecases/db-verify-otp-login-user';
import { ClientSequelizeAdapter } from '../../infraestruture/database/client-sequelize-adapter';
import { OwnerSequelizeAdapter } from '../../infraestruture/database/owner-sequelize-adapter';
import { JwtAdapter } from '../../infraestruture/cryptograph/jwt/jwt-adpter';
import { VerifyOtpAdapter } from '../utils/verify-otp-adapter';
import { DeviceSequelizeAdapter } from '../../infraestruture/database/device-sequelize-adapter';
import { EmailValidationAdapter } from '../utils/email-validation-adapter';
import { Validation } from '../../apresentation/protocols/validation';

export const makeVerifyOtpLoginUserController = () => {
    const validations: Validation[] = [];

    for (const field of ['otp', 'email']) {
      validations.push(new RequiredFieldValidation(field));
    }
  
    validations.push(new EmailValidation('email', new EmailValidationAdapter()));
    const validationComposite = new ValidationComposite(validations);

  const clientRepository = new ClientSequelizeAdapter();
  const ownerRepository = new OwnerSequelizeAdapter();
  const verifyOtpAdapter = new VerifyOtpAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);
  const deviceRepository = new DeviceSequelizeAdapter();

  const verifyOtpLoginUserUsecase = new DbVerifyOtpLoginUser(
    clientRepository,
    ownerRepository,
    verifyOtpAdapter,
    jwtAdapter,
    deviceRepository
  );

  return new VerifyOtpLoginUserController(validationComposite, verifyOtpLoginUserUsecase);
}; 
