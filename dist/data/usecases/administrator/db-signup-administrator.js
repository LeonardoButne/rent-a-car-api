"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSignupAdministrator = void 0;
const value_1 = require("../../../config/value");
class DbSignupAdministrator {
    hassPassword;
    generateSecret;
    signupAdministratorRepository;
    generateOtp;
    constructor(hassPassword, generateSecret, signupAdministratorRepository, generateOtp) {
        this.hassPassword = hassPassword;
        this.generateSecret = generateSecret;
        this.signupAdministratorRepository = signupAdministratorRepository;
        this.generateOtp = generateOtp;
    }
    async add(dataAdministrator) {
        const hashPassword = await this.hassPassword.hash(dataAdministrator.password);
        const generatedSecret = this.generateSecret.genarate(20);
        const addAdmin = await this.signupAdministratorRepository.add(Object.assign({}, dataAdministrator, {
            password: hashPassword,
            secretKey: generatedSecret,
        }));
        value_1.globalConfig.saveData = this.generateOtp.otp(generatedSecret, 6, 300);
        return addAdmin;
    }
}
exports.DbSignupAdministrator = DbSignupAdministrator;
//# sourceMappingURL=db-signup-administrator.js.map