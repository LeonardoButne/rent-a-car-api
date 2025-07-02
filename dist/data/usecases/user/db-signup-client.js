"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSignupUser = void 0;
const value_1 = require("../../../config/value");
class DbSignupUser {
    hassPassword;
    generateSecret;
    signupUserResponitory;
    generateOtp;
    constructor(hassPassword, generateSecret, signupUserResponitory, generateOtp) {
        this.hassPassword = hassPassword;
        this.generateSecret = generateSecret;
        this.signupUserResponitory = signupUserResponitory;
        this.generateOtp = generateOtp;
    }
    async add(dataUser) {
        const hashPassword = await this.hassPassword.hash(dataUser.password);
        const generatedSecret = this.generateSecret.genarate(20);
        const addAmin = await this.signupUserResponitory.add(Object.assign({}, dataUser, {
            password: hashPassword,
            secretKey: generatedSecret,
        }));
        value_1.globalConfig.saveData = this.generateOtp.otp(generatedSecret, 6, 300);
        return addAmin;
    }
}
exports.DbSignupUser = DbSignupUser;
//# sourceMappingURL=db-signup-client.js.map