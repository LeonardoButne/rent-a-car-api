"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAuthenticateAdministrator = void 0;
const value_1 = require("../../../config/value");
class DbAuthenticateAdministrator {
    getAccountAdministratorByEmail;
    comparePassword;
    generateOtp;
    constructor(getAccountAdministratorByEmail, comparePassword, generateOtp) {
        this.getAccountAdministratorByEmail = getAccountAdministratorByEmail;
        this.comparePassword = comparePassword;
        this.generateOtp = generateOtp;
    }
    async auth(data) {
        const account = await this.getAccountAdministratorByEmail.getAccountByEmail(data.email);
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
exports.DbAuthenticateAdministrator = DbAuthenticateAdministrator;
//# sourceMappingURL=db-login-administrator.js.map