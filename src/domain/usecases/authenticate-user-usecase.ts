export type AuthenticateUserInput = {
  email: string;
  password: string;
  deviceId?: string;
};

export type AuthenticateUserOutput =
  | {
      id: string;
      email: string;
      name: string;
      lastName: string;
      role: 'client' | 'owner';
      token: string;
    }
  | null
  | false
  | 'invalid_credentials';

export interface AuthenticateUserUsecase {
  auth(data: AuthenticateUserInput): Promise<AuthenticateUserOutput>;
} 