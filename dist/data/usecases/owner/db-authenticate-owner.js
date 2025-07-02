"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAuthenticateOwner = void 0;
const value_1 = require("../../../config/value");
class DbAuthenticateOwner {
    getAccountOwnerByEmail;
    comparePassword;
    generateOtp;
    constructor(getAccountOwnerByEmail, comparePassword, generateOtp) {
        this.getAccountOwnerByEmail = getAccountOwnerByEmail;
        this.comparePassword = comparePassword;
        this.generateOtp = generateOtp;
    }
    async auth(data) {
        const account = await this.getAccountOwnerByEmail.getAccountByEmail(data.email);
        if (!account) {
            return null;
        }
        if (account) {
            const passwordToCompare = await this.comparePassword.compare(data.password, account.password);
            if (!passwordToCompare) {
                return null;
            }
            if (account.statusAccount === false) {
                return false;
            }
            value_1.globalConfig.saveData = this.generateOtp.otp(account.secretKey, 6, 300);
            return { email: account.email };
        }
    }
}
exports.DbAuthenticateOwner = DbAuthenticateOwner;
//# sourceMappingURL=db-authenticate-owner.js.map