import 'dotenv/config'
import axios from 'axios'
import { MpesaPaymentData, MpesaPaymentRequest, PaymentMpesa } from '../../data/protocols/payement/m-pesa'

export class PaymentMpesaAdapter implements PaymentMpesa {
  constructor(
    private readonly generateIdUnique: string,
    private readonly generateIdUniqueReference: string,
  ) {}
  async pay(data: MpesaPaymentRequest): Promise<any> {
    const headers = {
      Host: 'api.vm.co.mz',
      'Content-Type': 'application/json',
      Authorization: process.env.MPESA_PAYMENT_TOKEN,
      Origin: '*',
    }

    const idGerado = this.generateIdUnique // Replace with your logic
    const referencia = this.generateIdUniqueReference // Replace with your logic

    const dados: MpesaPaymentData = {
      input_ThirdPartyReference: idGerado,
      input_Amount: `${data.amount}`,
      input_CustomerMSISDN: `258${data.phoneNumber}`,
      input_ServiceProviderCode: process.env.MPESA_SERVICE_PROVIDER_CODE,
      input_TransactionReference: referencia,
    }

    const response = await axios.post(`${process.env.PUBLIC_API_MPESA}`, dados, {
      headers,
    })
    return response.data
  }
}
