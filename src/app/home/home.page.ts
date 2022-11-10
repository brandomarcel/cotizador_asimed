import { CobrarCuotas, Cobros, Payer, Buyer, Payment, Amount, Instrument, Token, } from '../entidades/cobrar-cuotas';

import { ConexionService } from './../services/conexion.service';
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Registro } from '../entidades/registro';
import { Validar } from '../entidades/validar';
import { ProseSubsc, Respuesta, Status } from '../entidades/prose-subsc';
import { formatDate } from "@angular/common";
import { RegisSubs, Subscription } from '../entidades/regis-subs';
import Swal from 'sweetalert2';
import { DetalleplanPage } from '../detalleplan/detalleplan.page';
import { environment } from 'src/environments/environment';


declare var externo;
declare var guardado;
declare var h;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  eliminarLocalstorage() {
    localStorage.removeItem("_doctype:User");
    localStorage.removeItem("customize_doctype");
    localStorage.removeItem("_last_load");
    localStorage.removeItem("page_info");
    localStorage.removeItem("kento_carga_masiva_needs_to_reload");
    localStorage.removeItem("current_workspace");
    localStorage.removeItem("_version_number");
    localStorage.removeItem("metadata_version");
    localStorage.removeItem("_doctype:Entidades");

  }

  llanarexterno(url) {

    setTimeout(() => {
      this.probando();
    }, 5000);


    externo(url);
    guardado();




  }


  async realizarPago() {

    const loading = await this.loadingController.create({ message: 'Realizando Petición ...' })
    await loading.present();

    this.conexionService.guardarSuscripcion(this.identificacion, this.asismed).subscribe(res => {
      console.log(res)
      if (res) {

        this.reference = res;

        this.registrarSuscripcion();
        loading.dismiss();

      } else {
        console.log("algo paso ")
      }
    }, error => {
      console.error(error)
      this.sweetMensaje("Error de conexion vuelva a intentarlo...","Error")
      loading.dismiss();

    });



  }




  probando() {
    this.alertPagoTarjeta();
  }


  customAlertOptions: any = {
    cssClass: 'customAlertCss',

  };
  apiUrl = environment.apiUrl
  principal: boolean=true;
  principal2: boolean=false;
  estcivi: boolean = true;
  estadoCiudad: boolean;
  estadoCiudadSelectable: boolean;
  estadoPago = false;
  reference: any;
  proseSubsc: ProseSubsc;
  respuesta: Respuesta;
  status: Status;

  identificacion: any;
  asismed: any;

  regisSubs: RegisSubs;
  subscription: Subscription;

  cobrarCuotas: CobrarCuotas
  cobros: Cobros
  payer: Payer;
  buyer: Buyer;
  payment: Payment;
  amount: Amount;
  instrument: Instrument;
  token: Token;

  name = 'Cotizador';
  registro: Registro;
  validar: Validar;
  estado: any;
  estado1: any;
  estado2: any;
  estado3: any;
  estado4: any;
  estado5: any;
  atras: any;
  circulos: any;
  currentactive = 1;
  nombre1: any;
  apellido1: any;
  edad1: any;
  genero1: any;
  correo1: any;
  telefono1: any;
  celular1: any;
  cedulaTitular: any;
  estadoTitular: any;
  direccionTitular: any;
  provinciaTitular: any;
  fechanacTitular: any;
  primamensual: any;
  impuestos: any;
  chest: boolean = false;
  total: any;
  mens: any;
  impu: any;
  tot: any;
  plan: any;
  num: any;
  num2: any;
  colorButon: any;
  color: any;
  cuentabroker: any = "";
  nombrePrima: any = "Mensual";
  parentesco1: any = "TITULAR";
  conteoBeneficiarios: any = "";
  listaPlanes: any = [];
  ciudades: any = [];
  ciudad: any;
  estadobroker: boolean;
  mostrar1: boolean = true;
  mostrar2: boolean = false;
  listaBrokers: any;
  broker: any = null;
  botones: boolean;
  listaFrecuenciapagos: any = ["Mensual", "Semestral", "ANUAL"];
  frecuenciPagos: any = "";

  tresDatos: boolean;
  statusRegSus: any;
  tajetaIden: any;
  estadoConsulta:boolean;
  buttonIcon: string = "md-add";
  color1: string = "black";
  format2 = 'yyyy-MM-ddTHH:mm:ss-05:00';
  expiration: any;
  //words2 = [{edad:"",genero:"",parentesco:""}];
  words2: any = [];
  parentescos: any = ["CONYUGE", "HERMANO(A)", "HIJO(A)", "SUEGRO(A)"];
  listaEdades: any = [];
  listaEstados: any = ["CASADO(A)", "DIVORCIADO(A)", "SOLTERO(A)", "UNIÓN LIBRE", "UNIÓN DE HECHO", "VIUDO(A)"];


  listaPlanselec: any = [];

  listapagosDevuelta:any;
  //Demo purpose only, Data might come from Api calls/service
  public counts = [{ name: "Datos", icono: "person" }, { name: "Beneficiarios", icono: "people" }, { name: "Plan", icono: "reader" },
  { name: "Información", icono: "newspaper" }, { name: "Finalizar", icono: "checkmark-circle-sharp" }];

  public orderStatus = "Datos"

  sig = document.getElementById("siguiente");

  priMensual:any;
  impMensual:any;
  totMensual:any;
  
  priSemest:any;
  impSemest:any;
  totSemest:any;

  priAnual:any;
  impAnual:any;
  totAnual:any;
  constructor(private conexionService: ConexionService, private loadingController: LoadingController,
    private alertController: AlertController, private modalController: ModalController) { }
  ngOnInit() {

this.estadoConsulta=true;
    this.eliminarLocalstorage();


    this.botones = true;
    this.getBrokers();
    this.colorButon = "height: 100%; width: 100%; color: black; background-color: #f5f5f5; border-color: #f5f5f5;"
    this.color = "asdfasdfaa"
    this.listaEdades = "";
    this.estado1 = true;
    //this.principal2 = true;
    this.principal = true;

    //this.botones=false;
    //this.estadoPago=true;



    this.atras = true;

    this.getEdades();
    this.getCiudades()
  }



  open(event, plan) {
    console.log(event);

    if (plan == "LITE 40") {
      //this.color="Warning-shade" ;
      this.colorButon = "height: 100%; width: 100%; color: black; background-color: #F9E79F;"
      this.plan = plan;
    } else {
      this.color = "asdfasdfaa"
    }
    this.buttonIcon = "done-all"; // icon change name if u want to change icon too
    this.color1 = "red"; // any color u want it to change to
    //rest of your code
  }

  validarEmail(valor) {

    console.log(valor)
    if ((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(valor)) {
      return true;
    } else {
      return false;
    }
  }

  validarFecha(valor) {

    console.log(valor)
    var val = formatDate(valor, 'dd/MM/yyyy', 'en-US');
    console.log(val)
    if ((/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/).test(val)) {
      return true;
    } else {
      return false;
    }
  }

  continuarPrincipal() {
   
  this.principal2 = true;
  this.principal = false;
  }
  getEdades() {
    this.listaEdades = "";
    this.conexionService.getEdades().subscribe(data => {
      
      this.listaEdades = data["message"].datoList;
      console.log('this.listaEdades',this.listaEdades);
    }, error => {
      console.log(error);
    });
  }

  planesFinalizar=[];
  getPlanes(datos) {
    this.listaPlanes = "";
    this.conexionService.getPlanes(datos).subscribe(data => {
      console.log(data["message"].datoList);

      this.listaPlanes = data["message"].datoList;

this.planesFinalizar= data["message"].datoList;
      console.log(this.listaPlanes);

    }, error => {
      console.log(error);
    });
  }

  async getCondiciones_pdf(item) {
    console.log(item.plan);



    const loading = await this.loadingController.create({ message: 'Descargando ...' })
    await loading.present();
    this.conexionService.getCondiciones_pdf(item.plan).subscribe(data => {

      var url = window.URL.createObjectURL(data);
      window.open(url);
      loading.dismiss();
      console.log(data);
    }, error => {
      loading.dismiss();
      this.sweetMensaje('Error al descarga!','error')
      console.log(error);
    });
  }

  getCiudades() {
    this.ciudades = [];
    var temp = [];

    this.conexionService.getCiudades().subscribe(result => {
      //console.log(result["message"]);

      temp = result["message"];
      // console.log(temp.length);
      this.ciudades = temp
      console.log(this.ciudades)
    }, error => {
      this.sweetMensaje('Error de conexion...','error')
      
      console.log(error);
    });



  }

  ciudadSelect(event) {
    console.log(event.value.provincia)
    this.provinciaTitular = event.value.provincia;
    //console.log(this.ciudad.name);
  }

  clicksiguiente(event) {
    var lleno = "";
    console.log(event.target.id);

    console.log(this.counts.length);
    this.currentactive++;
    console.log(this.currentactive);
    /*     if (this.currentactive == this.counts.length) {
          console.log("entro");
          this.currentactive = this.counts.length;
          event.target.disabled = true;
        }else{
          console.log("entro ELSE");
          (<HTMLSelectElement>document.getElementById("atras")).disabled = false;
        }
    
        if(this.currentactive == 1){
          (<HTMLSelectElement>document.getElementById("atras")).disabled = true;
        
        
        } */


    if (this.currentactive == 2) {
      if (this.nombre1 == "" || this.apellido1 == "" || this.correo1 == ""
        || this.telefono1 == "" || this.celular1 == "" || this.fechanacTitular == ""
        || this.cedulaTitular == "" || this.genero1 == ""
        || this.cedulaTitular == undefined || this.nombre1 == undefined
        || this.apellido1 == undefined || this.correo1 == undefined
        || this.telefono1 == undefined || this.celular1 == undefined
        || this.fechanacTitular == undefined || this.genero1 == undefined
      ) {
        console.log(" no entro");
        
        this.sweetMensaje('Llene todos los campos','warning')
        this.currentactive--;
        (<HTMLSelectElement>document.getElementById("atras")).disabled = true;
      }
      else {
        var ced = this.validadorDeCedula(String(this.cedulaTitular));

        var email = this.validarEmail(String(this.correo1))
        console.log(email)
        console.log(this.fechanacTitular)
        var edad = this.calculoEdad(this.fechanacTitular)
console.log(edad)
        var fecha = this.validarFecha(this.fechanacTitular);
      
        if (edad === 0 ) {
          this.edad1 = "0-11 meses";

        } else if (edad >= 1 && edad <= 17) {
          this.edad1 = "1-17";

        } else if (edad >= 18 && edad <= 24) {
          this.edad1 = "18-24";

        } else if (edad >= 25 && edad <= 29) {
          this.edad1 = "25-29";

        } else if (edad >= 30 && edad <= 34) {
          this.edad1 = "30-34";

        } else if (edad >= 35 && edad <= 39) {
          this.edad1 = "35-39";

        } else if (edad >= 40 && edad <= 44) {
          this.edad1 = "40-44";

        } else if (edad >= 45 && edad <= 49) {
          this.edad1 = "45-49";

        } else if (edad >= 50 && edad <= 54) {
          this.edad1 = "50-54";

        } else if (edad >= 55 && edad <= 59) {
          this.edad1 = "55-59";

        } else if (edad >= 60 && edad <= 64) {
          this.edad1 = "60-64";

        } else if (edad >= 65 && edad <= 69) {
          this.edad1 = "65-69";

        } else if (edad >= 70 && edad <= 130) {
          this.edad1 = "70-130";

        }

        console.log(this.edad1)
        console.log(email)
        console.log(ced)
        console.log(fecha)
        if (ced == true && email == true && fecha == true) {

          //console.log(variableOne);

          this.update();
          (<HTMLSelectElement>document.getElementById("atras")).disabled = false;

        } else if (ced == false) {
          this.currentactive--;
          this.sweetMensaje('Ingrese una cedula valida','warning');
          
        }
        else if (email == false) {
          this.currentactive--;
          this.sweetMensaje('Ingrese un correo valido','warning');
         
        }else if(fecha == false){
          this.currentactive--;
          this.sweetMensaje('Ingrese una fecha valida','warning');
        }

      }


    } else if (this.currentactive == 3) {
      console.log("entro 3");
      this.words2.forEach(element => {
        console.log(element.genero);

        if (element.genero == "" || element.rango_edad == "" || element.parentesco == "") {
          lleno = "no";
        } else {
          lleno = "si";
        }



      });
      this.currentactive--;

      console.log(lleno);
      console.log(this.words2.length);
      if (this.words2.length == 0) {
        this.currentactive++;
        this.update();

      }
      if (lleno == "si") {
        this.currentactive++;
        this.update();

      } else if (lleno == "no") {
        this.sweetMensaje('Llene todos los campos','error');
        
      }


    } else if (this.currentactive == 4) {

      console.log("entro 4");
      console.log(this.listaPlanselec);

      if (!this.listaPlanselec.length) {
        this.sweetMensaje('Elija al menos un plan','warning');
       
        this.currentactive--;
      } else {

        this.update();
      }
    } else if (this.currentactive == 5) {

      this.botones = false;
      console.log("entro 5");

      if (this.cedulaTitular == "" || this.cedulaTitular == undefined
        || this.direccionTitular == "" || this.direccionTitular == undefined
        || this.estadoTitular == "" || this.estadoTitular == undefined
        || this.ciudad == "" || this.ciudad == undefined
        || this.fechanacTitular == "" || this.fechanacTitular == undefined) {
        this.currentactive--;
        console.log("ERROR NO LLENO 5")
       
        this.sweetMensaje('Llene todos los campos','error');

      } else {

        this.update();
      }

    }







    //console.log(this.genero1);
  }

  clickatras(event) {
    console.log(event.target.id);

    this.currentactive--;
    //console.log(this.counts.length);
    if (this.currentactive == 1) {
      console.log("entro");
      //this.currentactive = this.counts.length;
      event.target.disabled = true;

    } else {
      (<HTMLSelectElement>document.getElementById("siguiente")).disabled = false;
    }
    console.log(this.currentactive);
    this.before();
  }

  update() {
    console.log(this.currentactive);
    this.counts.forEach((element, i) => {
      console.log(i);
      if (i < this.currentactive) {
        console.log(i);

        this.orderStatus = element["name"];
        console.log(this.orderStatus);
      }

      if (this.orderStatus == "Datos") {
        this.estado1 = true;
        this.estado2 = false;
        this.estado3 = false;
        this.estado4 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Beneficiarios") {
        //this.words2 = [{edad:this.edad1,genero:this.genero1,parentesco:'TITULAR'}];


        this.estado2 = true;
        this.estado1 = false;
        this.estado3 = false;
        this.estado4 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Plan") {
        console.log(this.words2.length);
        //this.conteoBeneficiarios = this.words2.length;
//BENEFICIARIOS
        this.conteoBeneficiarios = this.words2.length;

        if (this.conteoBeneficiarios === 0) {
          console.log('conteoBeneficiarios= 0');
          var soloTitular = [{ rango_edad: this.edad1, genero: this.genero1 }];
          console.log(soloTitular);
          this.getPlanes(soloTitular);
        } else {
          console.log('else');
          var soloTitular = [{ rango_edad: this.edad1, genero: this.genero1 }];
          var todos = this.words2.concat(soloTitular);
          console.log(this.words2);
          console.log(todos);
          this.getPlanes(todos);
        }

        this.estado3 = true;
        this.estado2 = false;
        this.estado1 = false;
        this.estado4 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Información") {

        this.estado4 = true;
        this.estado2 = false;
        this.estado3 = false;
        this.estado1 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Finalizar") {
        console.log("A un paso de finalizar");
     
      
      console.log('(this.planesFinalizar);',this.planesFinalizar);
      console.log('(this.listaPlanselec);',this.listaPlanselec);
      this.planesFinalizar.forEach((element,i) => {
        this.listaPlanselec.forEach(item => {
          console.log(element.plan);
          console.log(item);

          if (element.plan == item) {
            this.comparacion.push(element)

          }
        });

        
       

     
        
      });

      console.log(this.comparacion);
       
        (<HTMLSelectElement>document.getElementById("atras")).disabled = true;
        this.insertDatos();
        this.estado5 = true;
        this.estado4 = false;
        this.estado2 = false;
        this.estado3 = false;
        this.estado1 = false;

      }


    }
    );
    console.log(this.orderStatus, this.currentactive);


  }
  comparacion =[];
  before() {



    console.log(this.currentactive);

    this.counts.forEach((element, i) => {
      console.log(i);
      if (i < this.currentactive) {
        i--;
        console.log(i);
        this.orderStatus = element["name"];
        console.log(this.orderStatus);
      }
      if (this.orderStatus == "Datos") {
        this.estado1 = true;
        this.estado2 = false;
        this.estado3 = false;
        this.estado4 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Beneficiarios") {
        this.estado2 = true;
        this.estado1 = false;
        this.estado3 = false;
        this.estado4 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Plan") {
        this.estado3 = true;
        this.estado2 = false;
        this.estado1 = false;
        this.estado4 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Información") {
        this.estado4 = true;
        this.estado2 = false;
        this.estado3 = false;
        this.estado1 = false;
        this.estado5 = false;

      } if (this.orderStatus == "Finalizar") {
        this.estado5 = true;
        this.estado4 = false;
        this.estado2 = false;
        this.estado3 = false;
        this.estado1 = false;

      }


    }
    );
    console.log(this.orderStatus, this.currentactive);
  }

  add() {
    this.words2.push({ rango_edad: '', genero: '', parentesco: '' });

  }
  borrarBeneficiario(event) {
    console.log(event.target.id);

    this.words2.splice(event.target.id, 1);

  }

  insertDatos() {

    console.log(this.nombre1);
    console.log(this.apellido1);
    console.log(this.correo1);
    console.log(this.telefono1);
    console.log(this.celular1);
    console.log(this.edad1);
    console.log(this.genero1);

    console.log(this.fechanacTitular);
    console.log(this.provinciaTitular);
    console.log(this.ciudad.name);
    console.log(this.ciudad);
    console.log(this.direccionTitular);

    console.log(this.plan);
    console.log(this.words2)

    const listaplanesAux=[];

    this.listaPlanselec.forEach(element => {
      listaplanesAux.push({detalle:element})
    });

    console.log('listaplanesAux:',listaplanesAux)

    this.registro = new Registro();

    this.registro.nombres = this.apellido1;
    this.registro.apellidos = this.nombre1;
    this.registro.cedula = String(this.cedulaTitular);
    this.registro.genero = this.genero1;
    this.registro.correo = this.correo1;
    this.registro.estado_civil = this.estadoTitular;
    this.registro.fecha_nac = this.fechanacTitular;
    this.registro.rango_edad = this.edad1;
    this.registro.provincia = this.provinciaTitular;
    if (this.ciudad.name == undefined) {
      console.log("undefined")
      this.registro.ciudad = this.ciudad;
    } else {
      console.log("name")
      this.registro.ciudad = this.ciudad.name;
    }

    this.registro.direccion = this.direccionTitular;
    this.registro.telefono = String(this.telefono1);
    this.registro.celular = String(this.celular1);
    //this.registro.plan = this.plan;
    this.registro.planes = listaplanesAux;
    if (this.words2.length == 0) {
      this.registro.beneficiarios = "";
    } else {
      this.registro.beneficiarios = this.words2;
      
    }

    console.log(this.registro);
    this.conexionService.insertDatos(this.registro).subscribe(data => {
      console.log(data.message);

      this.listapagosDevuelta=data.message.datoList
      this.frecuenciPagos = "Mensual"
      this.mens = data.message.datoList[0].prima_mensual;
      this.impu = data.message.datoList[0].impuestos;
      this.tot = data.message.datoList[0].total;
      


      this.priMensual = this.mens.toFixed(2);
      this.impMensual = this.impu.toFixed(2);
      this.totMensual = this.tot.toFixed(2);

      this.priSemest = (this.mens * 6).toFixed(2);
      this.impSemest = (this.impu * 6).toFixed(2);
      this.totSemest = (this.tot * 6).toFixed(2);

      this.priAnual = (this.mens * 12).toFixed(2);
      this.impAnual = (this.impu * 12).toFixed(2);
      this.totAnual = (this.tot * 12).toFixed(2);

      this.identificacion = this.cedulaTitular;
      this.asismed = data.message.identificador;

      console.log(this.identificacion);
      console.log(this.asismed);
    }

    );


  }

  cuentaconBroker($event) {
    console.log($event.target.value);
    var valor = $event.target.value;
    if (valor == "SI") {
      this.estadobroker = true;

    } else {
      this.estadobroker = false;
    }
  }

  calculoEdad(fecNac) {
    //var fecha=fecNac.detail.value;
    var hoy = new Date();
    var cumpleanos = new Date(fecNac);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    console.log('cumplea;os',cumpleanos)
    console.log('edad',edad)
console.log(m)
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    console.log(edad)

    return edad;

  }

  async consultarCedula($event) {
    //console.log($event.target.value);
    var cedula = $event.target.value;
    console.log(cedula.length)

    if (cedula.length <10) {
      this.estadoConsulta=true;
      this.nombre1 = "";
      this.apellido1 = "";
      this.fechanacTitular = "";
      this.genero1 = "";
      this.celular1 = "";
      this.correo1 = "";
      this.telefono1 = "";
      this.ciudad = ""
    }
    if (cedula.length == 10) {

      var cedvalida = this.validadorDeCedula(cedula);

      console.log("realizar consulta")
      console.log(cedvalida)
      const variableOne = "";
      if (cedvalida == true) {
        this.estadoConsulta=false;
        this.nombre1 = "";
        this.apellido1 = "";
        this.fechanacTitular = "";
        this.genero1 = "";
        this.celular1 = "";
        this.correo1 = "";
        this.telefono1 = "";
        this.ciudad = ""

        const loading = await this.loadingController.create({ message: 'Consultando ...' })
        await loading.present();

        this.conexionService.verificarExistencia(cedula).subscribe(res => {
          console.log(res)
          var persona = res.message

          if (persona == false) {
            this.estadoConsulta=false;
            this.estcivi = false;
            this.nombre1 = "";
            this.apellido1 = "";
            this.fechanacTitular = "";
            this.genero1 = "";
            this.celular1 = "";
            this.correo1 = "";
            this.telefono1 = "";
            this.ciudad = "";
            this.provinciaTitular = "";
            this.direccionTitular = "";
            this.estadoTitular = "";
            document.getElementById("nombre1")["disabled"] = false;
            document.getElementById("apellido1")["disabled"] = false;
            // document.getElementById("fechanacTitular")["disabled"] = false;
            document.getElementById("genero1")["disabled"] = false;
            document.getElementById("celular1")["disabled"] = false;
            document.getElementById("correo1")["disabled"] = false;
            document.getElementById("telefono1")["disabled"] = false;
            this.estadoCiudadSelectable = true;
            this.estadoCiudad = false;

            //document.getElementById("correo1")["disabled"] = false;
            //document.getElementById("telefono1")["disabled"] = false;
          } else {
            this.estcivi = true;
            console.log(persona[0])
            console.log(this.ciudades)
            const variableOne = this.ciudades.filter((itemInArray => (itemInArray.name === persona[0].localidad)))

            console.log(variableOne)
            //console.log(variableOne[0].name)
            //this.ciudades = variableOne;
            this.ciudad = variableOne[0].name;
            this.estadoCiudadSelectable = false;
            this.estadoCiudad = true;
            this.provinciaTitular = variableOne[0].provincia;
            this.nombre1 = persona[0].nombres;
            this.apellido1 = persona[0].apellidos;
            this.fechanacTitular = persona[0].fecha_nac;
            this.direccionTitular = persona[0].direccion;
            this.estadoTitular = persona[0].estado_civil;

            var email = this.validarEmail(String(persona[0].correo))

            if (persona[0].genero == "" || persona[0].genero == "Sociedades" || persona[0].genero == "CIAS DE SEGUROS") {
              document.getElementById("genero1")["disabled"] = false;
            } else {
              this.genero1 = persona[0].genero;
              document.getElementById("genero1")["disabled"] = true;
            }


            if (persona[0].telefono_cel == "") {
              //document.getElementById("celular1")["disabled"] = false;
            } else {
              this.celular1 = "0" + persona[0].telefono_cel;
              //document.getElementById("celular1")["disabled"] = true;
            }

            if (persona[0].correo == "") {
              document.getElementById("correo1")["disabled"] = false;
            } else {
              this.correo1 = persona[0].correo;
              document.getElementById("correo1")["disabled"] = true;
            }
            if (persona[0].telefono_dom == "") {
              //document.getElementById("telefono1")["disabled"] = false;
            } else {
              this.telefono1 = "0" + persona[0].telefono_dom;
              //document.getElementById("telefono1")["disabled"] = true;
            }

            document.getElementById("nombre1")["disabled"] = true;
            document.getElementById("apellido1")["disabled"] = true;
            //document.getElementById("fechanacTitular")["disabled"] = true;
            console.log(email)
            if (email == false) {
              console.log(true)
              this.sweetMensaje('El correo electronico no es valido contactarse con soporte','error');
              
              (<HTMLSelectElement>document.getElementById("siguiente")).disabled = true;

            } else {
              (<HTMLSelectElement>document.getElementById("siguiente")).disabled = false;
            }


          }
          loading.dismiss();
        }, error => {
          console.log(error)
          loading.dismiss();
          this.sweetMensaje('Error de conexión','error');
          
        })

      } else if (cedvalida == false) {
        this.nombre1 = "";
            this.apellido1 = "";
            this.fechanacTitular = "";
            this.genero1 = "";
            this.celular1 = "";
            this.correo1 = "";
            this.telefono1 = "";
            this.ciudad = "";
            this.provinciaTitular = "";
            this.direccionTitular = "";
            this.estadoTitular = "";
        this.currentactive--;
        this.sweetMensaje('Ingrese una cedula valida','warning');
        
      }

    }


  }

  getBrokers() {
    this.conexionService.getBrokers().subscribe(res => {
      console.log(res)
      this.listaBrokers = res["message"];
    }, error => {
      console.log(error);
    });
  }

  labelFrecuencia($event) {
    console.log($event.target.value);
    var frecuencia = $event.target.value;
    var mensual = this.mens;
    var impuesto = this.impu;
    var total = this.tot;
    console.log(mensual);

    if (frecuencia == "Mensual") {
      this.nombrePrima = "MENSUAL";
      this.primamensual = mensual.toFixed(2);
      this.impuestos = impuesto.toFixed(2);
      this.total = total.toFixed(2);



    } else if (frecuencia == "Semestral") {
      this.nombrePrima = "SEMESTRAL";
      this.primamensual = (mensual * 6).toFixed(2);
      this.impuestos = (impuesto * 6).toFixed(2);
      this.total = (total * 6).toFixed(2);



    }
    else if (frecuencia == "ANUAL") {

      this.nombrePrima = "ANUAL";
      this.primamensual = (mensual * 12).toFixed(2);
      this.impuestos = (impuesto * 12).toFixed(2);
      this.total = (total * 12).toFixed(2);

    }

  }

  

  async alertPagoTarjeta() {

    const alert = await this.alertController.create({
      cssClass: 'dlgconfirmar',
      mode: 'ios',
      header: '',
      message: 'De acuerdo a lo seleccionado, se procesará la información',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',

        handler: (blah) => {

          var status = JSON.parse(sessionStorage.getItem("status"));
          console.log(status)
          console.log(status.status)
          this.statusRegSus = status;
          sessionStorage.removeItem("status");


          if (status) {

            if (status.status.status == "APPROVED") {
              console.log("APPROVED")
              this.cobroTarjeta();

            } else if (status.status.status == "REJECTED") {
              //this.cobroTarjeta();
              console.log("REJECTED")
              this.cancelarPago("Transaccion cancelada");

            } else if (status.status.status == "RECHAZADO") {
              this.cancelarPago("Transaccion rechazada...");
            }

          } else {
            this.sweetMensaje('Intente Nuevamente...','error');
            

          }





        }
      }]
    });

    await alert.present();
  }


  async cancelarPago(mensaje) {

    const loading = await this.loadingController.create({ message: mensaje })
    await loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }

  async registrarSuscripcion() {
    const loading = await this.loadingController.create({ message: 'Realizando Petición ...' })
    await loading.present();
    var fecha = new Date();
    fecha.getTime()
    fecha.getMinutes()
    fecha.setMinutes(fecha.getMinutes() + 10)
    fecha.getMinutes()
    var soloFecha = formatDate((fecha.getTime()), this.format2, 'en-US');
    this.expiration = soloFecha;


    console.log(this.expiration)



    this.buyer = new Buyer();
    this.buyer.document = this.cedulaTitular;
    this.buyer.name = this.nombre1;
    this.buyer.surname = this.apellido1;
    this.buyer.email = this.correo1;
    this.buyer.documentType = "CI";
    this.buyer.mobile = this.celular1;

    this.subscription = new Subscription()
    this.subscription.reference = this.reference;
    this.subscription.descripcion = 'COT_' + this.cedulaTitular + '';

    this.regisSubs = new RegisSubs();
    this.regisSubs.auth = null;
    this.regisSubs.locale = "es_EC";
    this.regisSubs.buyer = this.buyer;
    this.regisSubs.subscription = this.subscription;
    this.regisSubs.expiration = this.expiration;
    this.regisSubs.ipAddress = "0:0:0:0:0:0:0:1";
    this.regisSubs.userAgent = "webkit";
    this.regisSubs.returnUrl = "https://dnetix.co/p2p/client";
    this.regisSubs.cancelUrl = "https://dnetix.co";
    this.regisSubs.skipResult = true;
    this.regisSubs.noBuyerFill = false;
    this.regisSubs.captureAddress = false;
    this.regisSubs.paymentMethod = null;

    console.log(this.regisSubs)


    this.conexionService.registrarSuscripcion(this.regisSubs).subscribe(res => {
      console.log(res["processUrl"])

      loading.dismiss();
      this.llanarexterno(res["processUrl"])

    });

  }


  async cobroTarjeta() {

    console.log("entro")
    console.log(this.statusRegSus)

    this.status = new Status();
    this.status.status = this.statusRegSus.status.status;
    this.status.reason = this.statusRegSus.status.reason;
    this.status.message = this.statusRegSus.status.message;
    this.status.date = this.statusRegSus.status.date;

    this.respuesta = new Respuesta();
    this.respuesta.status = this.status;
    this.respuesta.requestId = this.statusRegSus.requestId;
    this.respuesta.processUrl = "";
    this.respuesta.reference = this.statusRegSus.reference;
    this.respuesta.signature = this.statusRegSus.signature;
    this.respuesta.type = "response";




    this.proseSubsc = new ProseSubsc();
    this.proseSubsc.requestid = this.statusRegSus.requestId;
    this.proseSubsc.identificacion = this.cedulaTitular;
    this.proseSubsc.codAsismed = this.asismed;
    this.proseSubsc.suscripcion = this.reference
    this.proseSubsc.respuesta = this.respuesta;



    console.log(this.proseSubsc)
    const loading = await this.loadingController.create({ message: 'Procesando Informacion ...' })
    await loading.present();

    this.conexionService.procesarSuscripcion(this.proseSubsc).subscribe(res => {

      console.log(res)
      if (res == 'OK') {
        loading.dismiss();

        console.log("ok")
        this.getTarjetaPorIdentificacion();

      } else if (res == 'PENDIENTE') {
        console.log("PENDIENTE")
      } else if (res == 'RECHAZADO') {
        loading.dismiss();

        
        this.sweetMensaje('Alguno de los parámetros de la tarjeta estuvo mal ingresado o hay algún problema en la tarjeta','error');
      }

    });
  }

  async getTarjetaPorIdentificacion() {
    const loading = await this.loadingController.create({ message: 'Consultanto Datos ...' })
    await loading.present();

    this.conexionService.getTarjetaPorIdentificacion(this.cedulaTitular).subscribe(res => {
      console.log(res)

      this.tajetaIden = res;


      if (res != "") {
        loading.dismiss();
        this.cobrarCuotasRecurrentesAsismed();

      } else {

        console.log("ERROR getTarjetaPorIdentificacion")
      }
    });
  }

  async cobrarCuotasRecurrentesAsismed() {

    console.log(this.tajetaIden)


    this.token = new Token();
    this.token.token = this.tajetaIden.token;

    this.instrument = new Instrument();
    this.instrument.token = this.token;

    this.amount = new Amount();
    this.amount.taxes = null;
    this.amount.currency = "USD";
    this.amount.total = this.total;

    this.payment = new Payment();
    this.payment.amount = this.amount;
    this.payment.reference = this.asismed;
    this.payment.description = "Cotizador compra";

    this.buyer = new Buyer();

    if (this.tajetaIden.buyer.document) {
      this.buyer.document = this.tajetaIden.buyer.document;
    } else {
      this.buyer.mobile = null;
    }

    if (this.tajetaIden.buyer.name) {
      this.buyer.name = this.tajetaIden.buyer.name;
    } else {
      this.buyer.name = null;
    }

    if (this.tajetaIden.buyer.surname) {
      this.buyer.surname = this.tajetaIden.buyer.surname;
    } else {
      this.buyer.surname = null;
    }

    if (this.tajetaIden.buyer.email) {
      this.buyer.email = this.tajetaIden.buyer.email;
    } else {
      this.buyer.email = null;
    }

    if (this.tajetaIden.buyer.documentType) {
      this.buyer.documentType = this.tajetaIden.buyer.documentType;
    } else {
      this.buyer.documentType = null;
    }

    if (this.tajetaIden.buyer.mobile) {
      this.buyer.mobile = this.tajetaIden.buyer.mobile;
    } else {
      this.buyer.mobile = "9999999999";
    }


    this.payer = new Payer();

    if (this.tajetaIden.payer.document) {
      this.payer.document = this.tajetaIden.payer.document;
    } else {
      this.payer.mobile = null;
    }

    if (this.tajetaIden.payer.name) {
      this.payer.name = this.tajetaIden.payer.name;
    } else {
      this.payer.name = null;
    }

    if (this.tajetaIden.payer.surname) {
      this.payer.surname = this.tajetaIden.payer.surname;
    } else {
      this.payer.surname = null;
    }

    if (this.tajetaIden.payer.email) {
      this.payer.email = this.tajetaIden.payer.email;
    } else {
      this.payer.email = null;
    }

    if (this.tajetaIden.payer.documentType) {
      this.payer.documentType = this.tajetaIden.payer.documentType;
    } else {
      this.payer.documentType = null;
    }

    if (this.tajetaIden.payer.mobile) {
      this.payer.mobile = this.tajetaIden.payer.mobile;
    } else {
      this.payer.mobile = "9999999999";
    }



    this.cobrarCuotas = new CobrarCuotas();
    this.cobrarCuotas.auth = null;
    this.cobrarCuotas.payer = this.payer;
    this.cobrarCuotas.buyer = this.buyer;
    this.cobrarCuotas.payment = this.payment;
    this.cobrarCuotas.instrument = this.instrument;



    this.cobros = this.cobrarCuotas;

    console.log(this.cobros)

    const loading = await this.loadingController.create({ message: 'Realizando Pago ...' })
    await loading.present();

    this.conexionService.cobrarCuotasRecurrentesAsismed(this.cobros).subscribe(res => {
      console.log(res)
      console.log(res[0].payment[0].status.message)
      console.log(res[0].payment[0].status.status)
      if (res[0].payment[0].status.message != null && res[0].payment[0].status.status == "APPROVED") {
        console.log("APPROVED")
        loading.dismiss();
        this.guardaKyana();

      } else {
        loading.dismiss();
        console.error(res[0].payment[0].status.status)
        
        this.sweetMensaje('Error en la transaccion','error');
      }

    });

  }



  async guardaKyana() {
    console.log("guardar")
    const loading = await this.loadingController.create({ message: 'Registrando Informacion ...' })
    await loading.present();
    this.conexionService.validarDatos(this.validar).subscribe(res => {
      console.log(res)
      loading.dismiss();
      this.estado5 = false;
      this.botones = false;
      this.estadoPago = true

    })
  }


  async alertExito(titulo, mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'dlgconfirmar',
      mode: 'ios',
      header: titulo,
      message: mensaje,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',

        handler: (blah) => {

          window.location.reload();

        }
      }]
    });

    await alert.present();
  }

  validadorDeCedula(cedula: string) {
    // Autor: jefferk

    //let cedulaCorrecta = false;
    console.log(String(cedula))
    if (cedula.length == 10 || cedula.length == 13) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < (cedula.length - 1); i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
        }
        suma = Math.round(suma);
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);
        if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
          // cedulaCorrecta = true;
          return true;
        } else if ((10 - (Math.round(suma % 10))) == verificador) {
          //  cedulaCorrecta = true;
          return true;

        } else {
          // cedulaCorrecta = false;
          return false;

        }
      } else {
        // cedulaCorrecta = false;
        return true;

      }
    } else {
      // cedulaCorrecta = false;
      return false;

    }




  }

/*   async guardar() {

    this.validar = new Validar();
    this.validar.cedula = this.cedulaTitular;
    console.log(this.broker)
    this.validar.frecuencia = this.frecuenciPagos;
    if (this.cuentabroker == "SI") {
      if (this.broker) {
        this.validar.broker = this.broker.parent;
      } else {
        this.validar.broker = "";
      }



    } else if (this.cuentabroker == "NO") {
      this.validar.broker = null;
    }

    console.log(this.validar)


    if (this.cuentabroker == undefined || this.cuentabroker == "" || this.validar.broker == "") {
      this.alertError("Alerta!", 'Seleccione si cuenta con un Broker');
    } else {
      console.log("Proceder al pago")
      this.realizarPago();


    }

  } */

  async guardar() {

    this.validar = new Validar();
    this.validar.cedula = this.cedulaTitular;
    console.log(this.broker)
    this.validar.frecuencia = this.frecuenciPagos;
    if (this.cuentabroker == "SI") {
      if (this.broker) {
        this.validar.broker = this.broker.parent;
      } else {
        this.validar.broker = "";
      }



    } else if (this.cuentabroker == "NO") {
      this.validar.broker = null;
    }

    console.log(this.validar)


    if (this.cuentabroker == undefined || this.cuentabroker == "" || this.validar.broker == "") {
      
      this.sweetMensaje('Seleccione si cuenta con un Broker','warning');
    } else {
      console.log("finalCotizacion")
      this.finalCotizacion();


    }

  }

  async finalCotizacion(){
    console.log(this.asismed);
    const loading = await this.loadingController.create({ message: 'Generando Cotización ...' })
    await loading.present();
    this.conexionService.sendmail_Cotizacion(this.asismed,this.validar.broker).subscribe(data => {
console.log(data)
      loading.dismiss();

      if (data['message'].estado == true) {
        console.log("guardar")

        this.sweetMensaje(data['message'].dato,'success');
       

            this.estado5 = false;
            this.botones = false;
            this.estadoPago = true;
     
      }else{
        this.sweetMensaje(data['message'].mensajeError,'error');
        

      }
     
     
    }, error => {
      loading.dismiss();
      this.sweetMensaje('Error al generar la cotización','error');
      console.log(error);
    });

  

    
  }

  nuevaCotizacion() {
    console.log("termino")
    window.location.reload();
  }


  activar($event, item) {

    this.mostrar1 = false;
    this.mostrar2 = true;



  }
  activar2($event, item) {

    this.mostrar1 = true;
    this.mostrar2 = false;
  }
  async detallePlan(plan){
    console.log(plan);

    const modal = await this.modalController.create({
      component: DetalleplanPage,
      cssClass: 'custom_modal',
      mode:'ios',
      componentProps: {
        nuevo: plan,
      }
    });
     return await modal.present();

  }
   removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}
  seleccionPlan($event, item) {
    console.log($event.target.id);
 
if ($event.target.checked === false) {
  this.listaPlanselec.push(item);
}else{
  this.removeItemFromArr(this.listaPlanselec,item)
}
   

    console.log(this.listaPlanselec);
    console.log($event.target.checked);
    console.log($event.target.id);
    console.log(item);
    console.log(this.listaPlanes);
    var estado: boolean;


   

    console.log(this.listaPlanselec);

    if (this.listaPlanselec.length > 3) {
      this.sweetMensaje("Maximo de planes para cotizar son 3!","warning");
      this.removeItemFromArr(this.listaPlanselec,item)
//this.listaPlanselec.splice(3,1);
console.log(this.listaPlanselec);
      var cambio = document.getElementById(item)

      console.log(cambio);
      cambio["checked"] = true;
    }

    /*     var cambio = document.getElementById("LITE 20")
        cambio["checked"]=true;
        this.plan = item; */

    /* this.listaPlanes.forEach(element => {
      console.log(element.plan)
      console.log(item)

      if ($event.target.id == element.plan) {

        this.plan = item;
        estado = false;

        if ($event.target.checked == true) {
          estado = true;
          this.plan = "";
        }
        console.log($event.target.checked);

      } else {
        var cambio = document.getElementById(element.plan)
        cambio["checked"] = false;
        console.log($event.target.checked);
      }


    });
    var cambio = document.getElementById($event.target.id)
    cambio["checked"] = estado;

    console.log(this.plan) */
  }

  async descargarPDF(){
    console.log(this.asismed);

    const loading = await this.loadingController.create({ message: 'Descargando ...' })
    await loading.present();
    this.conexionService.getTmpEntidad_pdf(this.asismed).subscribe(data => {

      var url = window.URL.createObjectURL(data);
      window.open(url);
      loading.dismiss();
      console.log(data);
    }, error => {
      loading.dismiss();
      this.sweetMensaje('Error al descargar el PDF','error');
      
      console.log(error);
    });
  }

  async sweetMensaje(titulo,icono): Promise<any>{
    return new Promise(async (resolve) =>{
      Swal.fire({
        title: titulo,
        heightAuto: false,
        icon: icono,
        confirmButtonText: 'Ok',
        //showDenyButton: true,
        //denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          resolve('ok')
          
        } /* else if (result.isDenied) {
          resolve('cancelar')
        } */
      })
    })
    
  }
  
}
