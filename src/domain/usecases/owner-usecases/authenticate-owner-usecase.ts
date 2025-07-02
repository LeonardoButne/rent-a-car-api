import { OwnerForLogin } from './signup-owner-usecase';

export type AuthenticateOwnerAttributes = {
  email: string;
  password: string;
};

export interface AuthenticateOwner {
  auth(data: AuthenticateOwnerAttributes): Promise<OwnerForLogin | boolean>;
} 