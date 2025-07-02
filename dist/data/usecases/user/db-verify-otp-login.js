"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbVerifyOtpLogin = void 0;
class DbVerifyOtpLogin {
    getAccountAdminByEmailRepository;
    verifyOtp;
    generateToken;
    constructor(getAccountAdminByEmailRepository, verifyOtp, generateToken) {
        this.getAccountAdminByEmailRepository = getAccountAdminByEmailRepository;
        this.verifyOtp = verifyOtp;
        this.generateToken = generateToken;
    }
    async verify(otp, email) {
        const account = await this.getAccountAdminByEmailRepository.getAccountByEmail(email);
        if (!account) {
            return null;
        }
        const validateOtp = this.verifyOtp.isValid(account.secretKey, otp);
        if (!validateOtp) {
            return false;
        }
        const payload = {
            iss: 'www.rentacar',
            aud: 'Rent a car',
            sub: account.id,
            statusAccount: account.statusAccount,
            email: account.email,
            typeAccount: 'client',
        };
        return this.generateToken.token(payload);
    }
}
exports.DbVerifyOtpLogin = DbVerifyOtpLogin;
//# sourceMappingURL=db-verify-otp-login.js.map