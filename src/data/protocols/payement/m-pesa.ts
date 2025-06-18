export interface MpesaPaymentRequest {
  amount: number;
  phoneNumber: string;
}

export interface MpesaPaymentData {
  input_ThirdPartyReference: string;
  input_Amount: string;
  input_CustomerMSISDN: string;
  input_ServiceProviderCode: string | undefined;
  input_TransactionReference: string;
}

export interface MpesaApiResponse {
  output_ResponseCode: string;
  output_ResponseDesc: string;
  output_ConversationID?: string;
  output_TransactionID?: string;
  output_ThirdPartyReference?: string;
  [key: string]: any;
}

export interface PaymentMpesa {
  pay(data: MpesaPaymentRequest): Promise<MpesaApiResponse>;
}
