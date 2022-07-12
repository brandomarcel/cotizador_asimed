import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from '../entidades/registro';
import { Observable } from 'rxjs';
import { Validar } from '../entidades/validar';

environment
@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private apiUrl = environment.apiUrl
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
    console.log(datos)
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



  getCiudades(){
    let url = this.apiUrl + 'method/asimed.mod_poliza_elec.api_rest.localidades'
    return this.httpClient.post( url , {}, { headers:  { 'Content-Type': 'application/json'} });
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

  guardarSuscripcion() {
    let url = 'https://devapp.sweadenseguros.com:8083/cobranzasService/guardarSuscripcion/{1722195755}/{123}';
    return this.httpClient.get( url, { headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic YXNpc3RtZWQ6QXNpc3RNM2QuMjAyMQ=='},responseType: 'json', });
  }

}