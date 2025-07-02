"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class BcryptAdapter {
    salt;
    constructor(salt) {
        this.salt = salt;
    }
    async hash(password) {
        return await bcryptjs_1.default.hash(password, this.salt);
    }
    async compare(password, hashPassword) {
        return await bcryptjs_1.default.compare(password, hashPassword);
    }
}
exports.BcryptAdapter = BcryptAdapter;
//# sourceMappingURL=bcrypt-adapter.js.map