"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenarateSecretAdapter = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
class GenarateSecretAdapter {
    genarate(length) {
        return speakeasy_1.default.generateSecret({ length }).base32;
    }
}
exports.GenarateSecretAdapter = GenarateSecretAdapter;
//# sourceMappingURL=generate-secret-adapter.js.map