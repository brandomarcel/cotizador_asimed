export type Cobros = CobrarCuotas
export class CobrarCuotas {
    auth: any
    payer: Payer
    buyer: Buyer
    payment: Payment
    instrument: Instrument
  }
  
  export class Payer {
    document: string
    name: string
    surname: string
    email: string
    documentType: string
    mobile: string
  }
  
  export class Buyer {
    document: string
    name: string
    surname: string
    email: string
    documentType: string
    mobile: any
  }
  
  export class Payment {
    amount: Amount
    reference: string
    description: string
  }
  
  export class Amount {
    taxes: any
    currency: string
    total: number
  }
  
  export class Instrument {
    token: Token
  }
  
  export class Token {
    token: string
  }
  