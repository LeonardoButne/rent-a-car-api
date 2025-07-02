"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderId = exports.generateIdUnique = void 0;
const generateIdUnique = () => {
    const numeros = Math.floor(1000 + Math.random() * 9000); // 4 digits: 1000–9999
    const letras = Array.from({ length: 5 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    const sufixo = Math.floor(10 + Math.random() * 90); // 2 digits: 10–99
    return `COM${numeros}${letras}${sufixo}`;
};
exports.generateIdUnique = generateIdUnique;
const generateOrderId = () => {
    const prefix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const timestamp = Date.now();
    return `${prefix}${timestamp}`;
};
exports.generateOrderId = generateOrderId;
//# sourceMappingURL=generate-id-unique.js.map