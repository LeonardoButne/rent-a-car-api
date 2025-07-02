"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIdUniqueReference = void 0;
const generateIdUniqueReference = () => {
    const prefixo = "OEU";
    const parteAleatoria = Array.from({ length: 10 }, () => {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    return `${prefixo}${parteAleatoria}`;
};
exports.generateIdUniqueReference = generateIdUniqueReference;
//# sourceMappingURL=generate-unique-reference.js.map