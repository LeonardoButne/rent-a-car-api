import { ClientModel } from "./signup-client-usecase";

export interface VerifyOtpSignupClient {
    verify(
        secret: string,
        email: string,
        otp: string,
        account?: ClientModel
    ): Promise<string | null>
}
