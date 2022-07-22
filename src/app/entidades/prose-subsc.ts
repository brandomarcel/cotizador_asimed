export class ProseSubsc {
    requestid: number
    identificacion: string
    codAsismed: string
    suscripcion: string
    respuesta: Respuesta
  

}
export class Respuesta {
    status: Status
    requestId: number
    processUrl: string
    reference: string
    signature: string
    type: string
  }
  
  export class Status {
    status: string
    reason: string
    message: string
    date: string
  }
