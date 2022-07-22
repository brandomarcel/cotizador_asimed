export class RegisSubs {
    auth: any
    locale: string
    buyer: any
    subscription: Subscription
    expiration: string
    ipAddress: string
    userAgent: string
    returnUrl: string
    cancelUrl: string
    skipResult: boolean
    noBuyerFill: boolean
    captureAddress: boolean
    paymentMethod: any
  }

  
  export class Subscription {
    reference: string
    descripcion: string
  }
  