"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfirmSignupOwner = void 0;
class DbConfirmSignupOwner {
    verifyOtp;
    updateStatusAccountOwnerRepository;
    constructor(verifyOtp, updateStatusAccountOwnerRepository) {
        this.verifyOtp = verifyOtp;
        this.updateStatusAccountOwnerRepository = updateStatusAccountOwnerRepository;
    }
    async verify(secret, email, otp) {
        let result = null;
        const verify = this.verifyOtp.isValid(secret, otp);
        if (verify) {
            result =
                await this.updateStatusAccountOwnerRepository.updateStatusAccountOwner(email);
        }
        else {
            result = null;
            return null;
        }
        return result;
    }
}
exports.DbConfirmSignupOwner = DbConfirmSignupOwner;
//# sourceMappingURL=db-confirm-signup-owner.js.map