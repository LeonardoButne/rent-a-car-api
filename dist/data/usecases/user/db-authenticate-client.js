"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAuthenticateClient = void 0;
const value_1 = require("../../../config/value");
class DbAuthenticateClient {
    getAccountAdmin;
    comparePassword;
    generateOtp;
    constructor(getAccountAdmin, comparePassword, generateOtp) {
        this.getAccountAdmin = getAccountAdmin;
        this.comparePassword = comparePassword;
        this.generateOtp = generateOtp;
    }
    async auth(data) {
        const account = await this.getAccountAdmin.getAccount(data.email);
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
exports.DbAuthenticateClient = DbAuthenticateClient;
//# sourceMappingURL=db-authenticate-client.js.map