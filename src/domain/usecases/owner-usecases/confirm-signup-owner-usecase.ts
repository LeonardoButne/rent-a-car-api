import { OwnerModel } from "./signup-owner-usecase";

export interface VerifyOtpSignupOwner {
    verify(
        secret: string,
        email: string,
        otp: string,
        account?: OwnerModel
    ): Promise<string | null>
} 