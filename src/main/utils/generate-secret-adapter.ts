import { GenerateSecret } from '../../apresentation/protocols/generate-secret'
import speakeasy from 'speakeasy'

export class GenarateSecretAdapter implements GenerateSecret {
    genarate(length: number): string {
        return speakeasy.generateSecret({ length }).base32
    }
}
