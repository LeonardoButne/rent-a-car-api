import { Device, DeviceAttributes } from '../../domain/models/device';
import { DeviceRepository } from '../../data/repositories/device-repository';

export class DeviceSequelizeAdapter implements DeviceRepository {
  async addDevice(device: Omit<DeviceAttributes, 'id' | 'createdAt' | 'updatedAt'>): Promise<DeviceAttributes> {
    const created = await Device.create(device);
    return created.toJSON();
  }

  async findDevice(userId: string, userType: 'client' | 'owner', deviceId: string): Promise<DeviceAttributes | null> {
    const found = await Device.findOne({ where: { userId, userType, deviceId } });
    return found ? found.toJSON() : null;
  }

  async listDevicesByUser(userId: string, userType: 'client' | 'owner'): Promise<DeviceAttributes[]> {
    const devices = await Device.findAll({ where: { userId, userType } });
    return devices.map(d => d.toJSON());
  }
} 