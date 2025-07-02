"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbResendOtpOwner = void 0;
const value_1 = require("../../../config/value");
class DbResendOtpOwner {
    getAccountOwnerByEmailRepository;
    generateOtp;
    constructor(getAccountOwnerByEmailRepository, generateOtp) {
        this.getAccountOwnerByEmailRepository = getAccountOwnerByEmailRepository;
        this.generateOtp = generateOtp;
    }
    async send(email) {
        const account = await this.getAccountOwnerByEmailRepository.getAccountByEmail(email);
        if (!account) {
            return null;
        }
        const otp = this.generateOtp.otp(account.secretKey, 6, 300);
        value_1.globalConfig.saveData = otp;
        return {
            email: account.email
        };
    }
}
exports.DbResendOtpOwner = DbResendOtpOwner;
//# sourceMappingURL=db-resend-otp-owner.js.map