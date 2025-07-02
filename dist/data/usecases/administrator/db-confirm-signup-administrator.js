"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfirmSignupAdministrator = void 0;
class DbConfirmSignupAdministrator {
    verifyOtp;
    updateStatusAccountAdministratorRepository;
    constructor(verifyOtp, updateStatusAccountAdministratorRepository) {
        this.verifyOtp = verifyOtp;
        this.updateStatusAccountAdministratorRepository = updateStatusAccountAdministratorRepository;
    }
    async verify(secret, email, otp) {
        let result = null;
        const verify = this.verifyOtp.isValid(secret, otp);
        if (verify) {
            result =
                await this.updateStatusAccountAdministratorRepository.updateStatusAccountAdministrator(email);
        }
        else {
            result = null;
            return null;
        }
        return result;
    }
}
exports.DbConfirmSignupAdministrator = DbConfirmSignupAdministrator;
//# sourceMappingURL=db-confirm-signup-administrator.js.map