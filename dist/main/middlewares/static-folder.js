"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticfolder = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const staticfolder = express_1.default.static(path_1.default.resolve(__dirname, '..', '..', 'infraestruture', 'uploads'));
exports.staticfolder = staticfolder;
//# sourceMappingURL=static-folder.js.map