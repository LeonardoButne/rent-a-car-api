"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtAdapter {
    secretKey;
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    token(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWTSECRET_KEY);
    }
    async decrypt(token) {
        const value = jsonwebtoken_1.default.verify(token, process.env.JWTSECRET_KEY);
        return value;
    }
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt-adpter.js.map