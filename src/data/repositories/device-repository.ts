import { DeviceAttributes } from '../../domain/models/device';

export interface DeviceRepository {
  addDevice(device: Omit<DeviceAttributes, 'id' | 'createdAt' | 'updatedAt'>): Promise<DeviceAttributes>;
  findDevice(userId: string, userType: 'client' | 'owner', deviceId: string): Promise<DeviceAttributes | null>;
  listDevicesByUser(userId: string, userType: 'client' | 'owner'): Promise<DeviceAttributes[]>;
  removeDevice(deviceId: string): Promise<void>;
} 