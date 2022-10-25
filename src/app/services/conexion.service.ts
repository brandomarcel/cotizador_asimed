import { CobrarCuotas } from './../entidades/cobrar-cuotas';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from '../entidades/registro';
import { Observable } from 'rxjs';
import { Validar } from '../entidades/validar';
import { ProseSubsc } from '../entidades/prose-subsc';
import { RegisSubs } from '../entidades/regis-subs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private apiUrl = environment.apiUrl
  private autorization= environment.autorization
  constructor(private httpClient:HttpClient) { }

  login(user,pass) {
    let url = this.apiUrl + 'method/asimed.kentowebws.websw.login';
    let datos =  {
      usr:  user,
      pwd: pass
    } ; 
    return this.httpClient.post( url , datos, { headers: { 'Content-Type': 'application/json'},responseType: 'json' });
  }

  planes() {
    let url = this.apiUrl + 'method/asimed.kentowebws.websw.planes';

    return this.httpClient.get( url , { headers: { 'Content-Type': 'application/json'},responseType: 'json' });
  }
  getEdades() {
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.getEdades';

    return this.httpClient.get( url , { headers: { 'Content-Type': 'application/json'},responseType: 'json' });
  }

  getPlanes(beneficiarios) {
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.getPlanes';
    let datos = {
      datos:{ beneficiarios: beneficiarios}
     
    };
    return this.httpClient.post( url ,datos, { headers: { 'Content-Type': 'application/json'},responseType: 'json' });
  }

  getCondiciones_pdf(plan) {
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.getCondiciones_pdf';
    let datos = {
      datos:{ plan: plan}
     
    };
    console.log(datos)
    return this.httpClient.post( url ,datos, { headers: { 'Content-Type': 'application/json'},responseType: 'blob' });
  }

  getTmpEntidad_pdf(name) {
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.getTmpEntidad_pdf';
    let datos = {
      datos:{ identificador: name}
     
    };
    console.log(datos)
    return this.httpClient.post( url ,datos, { headers: { 'Content-Type': 'application/json'},responseType: 'blob' });
  }

  sendmail_Cotizacion(name,broker) {
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.sendmail_Cotizacion';
    let datos = {
      datos:{ identificador: name,broker:broker}
     
    };
    console.log(datos)
    return this.httpClient.post(url, datos, { headers:  { 'Content-Type': 'application/json'} });
  }



  getCiudades(){
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.localidades'
    return this.httpClient.post( url , {}, { headers:  { 'Content-Type': 'application/json'} });
  }

  getDetallePlanHTML(plan) {
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.getDetallePlanHTML';
    let datos ={ plan: plan}
     
    return this.httpClient.post( url ,datos, { headers: { 'Content-Type': 'application/json'},responseType: 'json' });
  }

  insertDatos(registro:Registro): Observable<any>{
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.insertDatos'
    let datos = {
      datos:registro
     
    };
  
    return this.httpClient.post(url, datos, { headers:  { 'Content-Type': 'application/json'} });
  }

  getBrokers() {
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.getBrokers';

    return this.httpClient.get( url , { headers: { 'Content-Type': 'application/json'},responseType: 'json' });
  }

  validarDatos(validar:Validar): Observable<any>{
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.validarDatos'
    let datos = {
      datos:validar
     
    };
  
    return this.httpClient.post(url, datos, { headers:  { 'Content-Type': 'application/json'} });
  }

  verificarExistencia(cedula:String): Observable<any>{
    let url = this.apiUrl + 'method/asimed.kentowebws.websw.verificarExistencia'
    let datos = {
      cedula:cedula
     
    };
  
    return this.httpClient.post(url, datos, { headers:  { 'Content-Type': 'application/json'} });
  }
  
  guardarSuscripcion(identificacion:any,asismed:any) {
    let url = 'https://devapp.sweadenseguros.com:8083/cobranzasService/guardarSuscripcion/'+identificacion+'/'+asismed+'';
    return this.httpClient.get( url, { headers: { 'Content-Type': 'application/json' ,'Authorization':this.autorization},responseType: 'json', });
  }

  registrarSuscripcion(datos:RegisSubs){
    let url = 'https://devapp.sweadenseguros.com:8083/cobranzasService/registrarSuscripcion';

    console.log(datos)
    return this.httpClient.post( url,datos, { headers: { 'Content-Type': 'application/json','Authorization':this.autorization},responseType: 'json', });
  }

  procesarSuscripcion(datos:ProseSubsc){
    let url = 'https://devapp.sweadenseguros.com:8083/cobranzasService/procesarSuscripcion';

    console.log(datos)
    return this.httpClient.post( url,datos, { headers: { 'Content-Type': 'application/json','Authorization':this.autorization},responseType: 'text', });
  }

  getTarjetaPorIdentificacion(identificacion:any){
    let url = 'https://devapp.sweadenseguros.com:8083/cobranzasService/getTarjetaPorIdentificacion/'+identificacion+'';

  
    return this.httpClient.get( url, { headers: { 'Content-Type': 'application/json','Authorization':this.autorization},responseType: 'json', });
  }

  cobrarCuotasRecurrentesAsismed(cobros:CobrarCuotas){
    let url = 'https://devapp.sweadenseguros.com:8083/cobranzasService/cobrarCuotasRecurrentesAsismed';
let datos=[cobros]

console.log(datos)
  
    return this.httpClient.post( url,datos,{ headers: { 'Content-Type': 'application/json','Authorization':this.autorization},responseType: 'json', });
  }
  


}
