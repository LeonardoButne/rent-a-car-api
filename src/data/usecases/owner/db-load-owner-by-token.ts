import { OwnerAttributes } from "../../../domain/models/owner";
import { LoadOwnerById } from "../../../domain/usecases/owner-usecases/load-owner-by-token-usecase";
import { Decrypter } from "../../protocols/decrypter/decrypter";
import { OwnerRepository } from "../../repositories/owner-repository";

export class DbLoadOwnerByToken implements LoadOwnerById{
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadOwnerByTokenRepository: OwnerRepository,
    ){}

    async loadOwnerById (accesstoken: string, role?: string): Promise<OwnerAttributes>{
        const token = await this.decrypter.decrypt(accesstoken)

        if(token) {
            const owner = await this.loadOwnerByTokenRepository.loadOwnerById(`${token.sub}`, role)
            if(owner){
                return owner
            }
        }    
        return null
    }
} 