import { DeviceTokenController } from '../../apresentation/controllers/device-token-controller';
import { DeviceSequelizeAdapter } from '../../infraestruture/database/device-sequelize-adapter';
import { DbRegisterDeviceToken } from '../../data/usecases/notification';
import { Controller } from '../../apresentation/protocols';

export const makeDeviceTokenController = (): Controller => {
  const deviceRepo = new DeviceSequelizeAdapter();
  const registerDeviceToken = new DbRegisterDeviceToken(deviceRepo);
  return new DeviceTokenController(registerDeviceToken);
}; 