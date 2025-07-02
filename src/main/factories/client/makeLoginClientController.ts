import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbAuthenticateClient } from '../../../data/usecases/client/db-authenticate-client';
import { Authenticate } from '../../../domain/usecases/client-usecases/authenticate-client-usecase';
import { BcryptAdapter } from '../../../infraestruture/cryptograph/encrypty/bcrypt-adapter';
import { SendEmailSignupClientDecorator } from '../../decorators/send-email-decorator';
import { GenerateOtpAdapter } from '../../utils/generate-otp-adpater';
import { SendEmailAdapter } from '../../utils/send-email';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';
import { LoginClientController } from '../../../apresentation/controllers/client/login-client-controller';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/client-sequelize-adapter';

export const makeLoginClientController = (): Controller => {
  // 1 - Infra - Adapters
  const clientRepository = new ClientSequelizeAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const generateOtp = new GenerateOtpAdapter();
  const sendEmailAdapter = new SendEmailAdapter();
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);

  // 2 - UseCase - Domínio
  const authenticateClient: Authenticate = new DbAuthenticateClient(clientRepository, bcryptAdapter, generateOtp);

  // 3 - Validations
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequestFieldValidation(field));
  }
  const validationComposite = new ValidationComposite(validations);

  // 4 - Controller com todas as dependências
  const loginClientController = new LoginClientController(validationComposite, authenticateClient);

  return new SendEmailSignupClientDecorator(loginClientController, sendEmailAdapter);
};
