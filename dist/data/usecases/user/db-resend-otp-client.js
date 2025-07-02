"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbResendOtpUser = void 0;
const value_1 = require("../../../config/value");
class DbResendOtpUser {
    getAccountUserByEmailRepository;
    generateOtp;
    constructor(getAccountUserByEmailRepository, generateOtp) {
        this.getAccountUserByEmailRepository = getAccountUserByEmailRepository;
        this.generateOtp = generateOtp;
    }
    async send(email) {
        const account = await this.getAccountUserByEmailRepository.getAccountByEmail(email);
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
exports.DbResendOtpUser = DbResendOtpUser;
//# sourceMappingURL=db-resend-otp-client.js.map