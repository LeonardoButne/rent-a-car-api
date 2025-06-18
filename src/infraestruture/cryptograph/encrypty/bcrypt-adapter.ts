import bcrypty from 'bcryptjs'
import { Comparetion } from '../../../data/protocols/cryptography/compare'
import { Hashed } from '../../../data/protocols/cryptography/hash'

export class BcryptAdapter implements Hashed, Comparetion {
    constructor(private readonly salt?: string | number) {}

    async hash(password: string): Promise<string> {
        return await bcrypty.hash(password, this.salt)
    }

    async compare(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypty.compare(password, hashPassword)
    }
}
