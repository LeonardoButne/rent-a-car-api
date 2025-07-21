import 'dotenv/config'
import axios from 'axios'
import { BimRequestBody, MilleniumBim } from '../../data/protocols/payement/millenium-bim'
export class MillenuimBimPaymentAdapter implements MilleniumBim {
  constructor(private readonly generateOrderId: string) {}

  async pay(dataBody: BimRequestBody): Promise<any> {
    const orderId = this.generateOrderId

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
    })

    const response = await axios.post(process.env.API_URL, datas.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    const sessionId = response.data
      ?.split('&')
      .find((param: string) => param.startsWith('session.id='))
      ?.split('=')[1]

    const successIndicator = response.data
      ?.split('&')
      .find((param: string) => param.startsWith('successIndicator='))
      ?.split('=')[1]

    return {
      successIndicator,
      sessionId,
      orderId,
      fullResponse: response.data,
      url: `${process.env.BACKEND_URL}/api/v1/payments/millenium-bim/checkout?sessionId=${sessionId}&orderId=${orderId}&amount=${dataBody.amount}`,
    }
  }
}
