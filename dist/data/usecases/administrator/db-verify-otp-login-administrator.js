"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbVerifyOtpLoginAdministrator = void 0;
class DbVerifyOtpLoginAdministrator {
    getAccountAdministratorByEmailRepository;
    verifyOtp;
    generateToken;
    constructor(getAccountAdministratorByEmailRepository, verifyOtp, generateToken) {
        this.getAccountAdministratorByEmailRepository = getAccountAdministratorByEmailRepository;
        this.verifyOtp = verifyOtp;
        this.generateToken = generateToken;
    }
    async verify(otp, email) {
        const account = await this.getAccountAdministratorByEmailRepository.getAccountByEmail(email);
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
            typeAccount: 'admin',
        };
        return this.generateToken.token(payload);
    }
}
exports.DbVerifyOtpLoginAdministrator = DbVerifyOtpLoginAdministrator;
//# sourceMappingURL=db-verify-otp-login-administrator.js.map