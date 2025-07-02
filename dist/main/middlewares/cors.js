"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsApp = void 0;
const cors_1 = __importDefault(require("cors"));
const allowList = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowList.includes(`${origin}`) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Não foi permitido pelo CORS'));
        }
    },
};
exports.corsApp = (0, cors_1.default)(corsOptions);
//# sourceMappingURL=cors.js.map