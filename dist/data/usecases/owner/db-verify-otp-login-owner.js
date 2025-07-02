"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbVerifyOtpLoginOwner = void 0;
class DbVerifyOtpLoginOwner {
    getAccountOwnerByEmailRepository;
    verifyOtp;
    generateToken;
    constructor(getAccountOwnerByEmailRepository, verifyOtp, generateToken) {
        this.getAccountOwnerByEmailRepository = getAccountOwnerByEmailRepository;
        this.verifyOtp = verifyOtp;
        this.generateToken = generateToken;
    }
    async verify(otp, email) {
        const account = await this.getAccountOwnerByEmailRepository.getAccountByEmail(email);
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
            isSuspended: account.isSuspended,
            email: account.email,
            typeAccount: 'owner',
        };
        return this.generateToken.token(payload);
    }
}
exports.DbVerifyOtpLoginOwner = DbVerifyOtpLoginOwner;
//# sourceMappingURL=db-verify-otp-login-owner.js.map