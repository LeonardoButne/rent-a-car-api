"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfirmSignupUser = void 0;
class DbConfirmSignupUser {
    verifyOtp;
    updateStatusAccountUserRepository;
    constructor(verifyOtp, updateStatusAccountUserRepository) {
        this.verifyOtp = verifyOtp;
        this.updateStatusAccountUserRepository = updateStatusAccountUserRepository;
    }
    async verify(secret, email, otp) {
        let result = null;
        const verify = this.verifyOtp.isValid(secret, otp);
        if (verify) {
            result =
                await this.updateStatusAccountUserRepository.updateStatusAccountClient(email);
        }
        else {
            result = null;
            return null;
        }
        return result;
    }
}
exports.DbConfirmSignupUser = DbConfirmSignupUser;
//# sourceMappingURL=db-confirm-signup-client.js.map