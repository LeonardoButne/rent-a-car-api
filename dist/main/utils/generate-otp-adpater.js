"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtpAdapter = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
class GenerateOtpAdapter {
    otp(secret, digits, time) {
        return speakeasy_1.default.totp({
            secret,
            encoding: 'base32',
            digits,
            step: time,
        });
    }
}
exports.GenerateOtpAdapter = GenerateOtpAdapter;
//# sourceMappingURL=generate-otp-adpater.js.map