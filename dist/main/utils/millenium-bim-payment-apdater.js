"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MillenuimBimPaymentAdapter = void 0;
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
class MillenuimBimPaymentAdapter {
    generateOrderId;
    constructor(generateOrderId) {
        this.generateOrderId = generateOrderId;
    }
    async pay(dataBody) {
        const orderId = this.generateOrderId;
        const datas = new URLSearchParams({
            apiOperation: 'CREATE_CHECKOUT_SESSION',
            apiPassword: process.env.API_PASSWORD,
            apiUsername: process.env.MERCHANT_USERNAME,
            merchant: process.env.MERCHANT,
            'order.id': orderId,
            'order.amount': `${dataBody.amount}`,
            'order.currency': 'MZN',
            'interaction.operation': 'PURCHASE',
            'interaction.returnUrl': dataBody.returnUrl,
        });
        const response = await axios_1.default.post(process.env.API_URL, datas.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const sessionId = response.data
            ?.split('&')
            .find((param) => param.startsWith('session.id='))
            ?.split('=')[1];
        const successIndicator = response.data
            ?.split('&')
            .find((param) => param.startsWith('successIndicator='))
            ?.split('=')[1];
        // console.log(baseUrl)s
        return {
            successIndicator,
            sessionId,
            orderId,
            fullResponse: response.data,
            url: `${process.env.BACKEND_URL}/api/v1/payments/millenium-bim/checkout?sessionId=${sessionId}&orderId=${orderId}&amount=${dataBody.amount}`,
        };
    }
}
exports.MillenuimBimPaymentAdapter = MillenuimBimPaymentAdapter;
//# sourceMappingURL=millenium-bim-payment-apdater.js.map