import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Validation } from "../../../protocols/validation";
import { ResendOtpUser } from "../../../../domain/usecases/user-usecases/resend-otp-user-usecase";
import { badRequest, send, serverError } from "../../../../apresentation/helpers/http-helpers";


export class ResendOTPUserController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly resendOtpUser: ResendOtpUser,
    ) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest)
            const { email } = httpRequest.body

            if(!email){
                return badRequest(new Error('Email obrigatorio'))
            }
            this.resendOtpUser.send(email)

            const otp = await this.resendOtpUser.send(email)

            if(otp === null){
                return badRequest(new Error('Email nao localizado') )
            }

            if(!otp){
                return badRequest(new Error('OTP nao gerado'))
            }

            return send(otp)
        } catch (error) {
            if (error.errors) {
                return serverError({
                    erro: error?.errors?.map((err: any) => err?.message),
                })
            } else {
                return serverError({ error })
            }
        }
    }


}