import { Payload } from '../../../apresentation/protocols/payload'

export interface GenerateToken {
    token(payload: Payload): string
}
