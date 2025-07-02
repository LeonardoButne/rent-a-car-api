import { AdministratorModel } from "./signup-administrator-usecase";

export interface VerifyOtpSignupAdministrator {
    verify(
        secret: string,
        email: string,
        otp: string,
    ): Promise<Error | AdministratorModel | boolean | [number]>
} 