import { AdministratorForLogin } from './signup-administrator-usecase';

export type AuthenticateAdministratorAttributes = {
  email: string;
  password: string;
};

export interface AuthenticateAdministrator {
  auth(data: AuthenticateAdministratorAttributes): Promise<AdministratorForLogin | boolean>;
} 