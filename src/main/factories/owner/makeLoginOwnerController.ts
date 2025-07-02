import { LoginOwnerController } from '../../../apresentation/controllers/owner/login-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbAuthenticateOwner } from '../../../data/usecases/owner/db-authenticate-owner';
import { AuthenticateOwner } from '../../../domain/usecases/owner-usecases/authenticate-owner-usecase';
import { BcryptAdapter } from '../../../infraestruture/cryptograph/encrypty/bcrypt-adapter';
import { OwnerSequelizeAdapter } from '../../../infraestruture/database/owner-sequelize-adapter';
import { SendEmailSignupClientDecorator } from '../../decorators/send-email-decorator';
import { GenerateOtpAdapter } from '../../utils/generate-otp-adpater';
import { SendEmailAdapter } from '../../utils/send-email';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';

export const makeLoginOwnerController = (): Controller => {
  // 1 - Infra - Adapters
  const ownerRepository = new OwnerSequelizeAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const generateOtp = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  // 2 - UseCase - Domínio
  const authenticateOwner: AuthenticateOwner = new DbAuthenticateOwner(ownerRepository, bcryptAdapter, generateOtp);

  // 3 - Validations
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequestFieldValidation(field));
  }
  const validationComposite = new ValidationComposite(validations);

  // 4 - Controller com todas as dependências
  const loginOwnerController = new LoginOwnerController(validationComposite, authenticateOwner);

  return new SendEmailSignupClientDecorator(loginOwnerController, sendEmailAdapter);
}; 