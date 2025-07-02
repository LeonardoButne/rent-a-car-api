"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMpesaAdapter = void 0;
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
class PaymentMpesaAdapter {
    generateIdUnique;
    generateIdUniqueReference;
    constructor(generateIdUnique, generateIdUniqueReference) {
        this.generateIdUnique = generateIdUnique;
        this.generateIdUniqueReference = generateIdUniqueReference;
    }
    async pay(data) {
        const headers = {
            Host: 'api.vm.co.mz',
            'Content-Type': 'application/json',
            Authorization: process.env.MPESA_PAYMENT_TOKEN,
            Origin: '*',
        };
        const idGerado = this.generateIdUnique; // Replace with your logic
        const referencia = this.generateIdUniqueReference; // Replace with your logic
        const dados = {
            input_ThirdPartyReference: idGerado,
            input_Amount: `${data.amount}`,
            input_CustomerMSISDN: `258${data.phoneNumber}`,
            input_ServiceProviderCode: process.env.MPESA_SERVICE_PROVIDER_CODE,
            input_TransactionReference: referencia,
        };
        const response = await axios_1.default.post(`${process.env.PUBLIC_API_MPESA}`, dados, {
            headers,
        });
        return response.data;
    }
}
exports.PaymentMpesaAdapter = PaymentMpesaAdapter;
//# sourceMappingURL=payment-mpesa.js.map