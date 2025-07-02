"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSignupOwner = void 0;
const value_1 = require("../../../config/value");
class DbSignupOwner {
    hassPassword;
    generateSecret;
    signupOwnerRepository;
    generateOtp;
    constructor(hassPassword, generateSecret, signupOwnerRepository, generateOtp) {
        this.hassPassword = hassPassword;
        this.generateSecret = generateSecret;
        this.signupOwnerRepository = signupOwnerRepository;
        this.generateOtp = generateOtp;
    }
    async add(dataOwner) {
        const hashPassword = await this.hassPassword.hash(dataOwner.password);
        const generatedSecret = this.generateSecret.genarate(20);
        const addOwner = await this.signupOwnerRepository.add(Object.assign({}, dataOwner, {
            password: hashPassword,
            secretKey: generatedSecret,
        }));
        value_1.globalConfig.saveData = this.generateOtp.otp(generatedSecret, 6, 300);
        return addOwner;
    }
}
exports.DbSignupOwner = DbSignupOwner;
//# sourceMappingURL=db-signup-owner.js.map