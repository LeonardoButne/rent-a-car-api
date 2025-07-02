"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtpAdapter = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
class VerifyOtpAdapter {
    isValid(secret, token) {
        return speakeasy_1.default.totp.verify({
            secret: secret,
            encoding: 'base32',
            token,
            step: 300,
            window: 3,
        });
    }
}
exports.VerifyOtpAdapter = VerifyOtpAdapter;
//# sourceMappingURL=verify-otp-adapter.js.map