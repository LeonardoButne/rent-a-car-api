import { ClientModel } from "./signup-client-usecase";

export interface VerifyOtpSignupClient {
    verify(
        secret: string,
        email: string,
        otp: string,
    ): Promise<Error | ClientModel | boolean | [number]>
}
