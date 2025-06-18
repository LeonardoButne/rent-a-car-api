
export type BodyAPi = {
  apiOperation: string
  apiPassword: string
  apiUsername: string
  orderId: string
  orderAmount: number
  orderCurrency: string
  interactionOperation: string
  interactionReturnUrl: string
}

export type BimRequestBody = {
  amount: number
  returnUrl: string
}

export interface MilleniumBim {
  pay(data: BimRequestBody): Promise<any>
}

export interface UrlSearchParamsAPI {
  api(data: BodyAPi): Promise<any>
}
