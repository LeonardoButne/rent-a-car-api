import jwt from 'jsonwebtoken';
import { Payload } from '../../../apresentation/protocols/payload';
import { GenerateToken } from '../../../data/protocols/cryptography/generate-token';
import { TokenData } from '../../../data/protocols/decrypter/decrypter';

export class JwtAdapter implements GenerateToken {
  constructor(private readonly secretKey: string) {}
  token(payload: Payload): string {
    return jwt.sign(payload, process.env.JWTSECRET_KEY);
  }

  async decrypt(token: string): Promise<TokenData | string> {
    const value: any | TokenData = jwt.verify(token, process.env.JWTSECRET_KEY);
    return value;
  }
}
