import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { badRequest, ok, serverError } from '../helpers/http-helpers';
import { RegisterDeviceTokenUsecase } from '../../domain/usecases/notification-usecases';

export class DeviceTokenController implements Controller {
  constructor(private readonly registerDeviceToken: RegisterDeviceTokenUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.token?.sub;
      const userType = httpRequest.token?.typeAccount;
      const { deviceToken } = httpRequest.body;
      if (!userId || !userType || !deviceToken) {
        return badRequest(new Error('userId, userType e deviceToken são obrigatórios.'));
      }
      if (userType !== 'client' && userType !== 'owner') {
        return badRequest(new Error('Tipo de usuário não suportado para device token.'));
      }
      await this.registerDeviceToken.register({
        userId,
        userType,
        deviceId: deviceToken,
      });
      return ok({ success: true });
    } catch (error) {
      return serverError({ error });
    }
  }
} 