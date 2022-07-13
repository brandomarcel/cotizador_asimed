import { PruebaPage } from './../prueba/prueba.page';

import { ConexionService } from './../services/conexion.service';
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Registro } from '../entidades/registro';
import { Validar } from '../entidades/validar';


declare var externo;
declare var guardado;
declare var h;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  

  async llanarexterno(){

/*     const modal = await this.modalController.create({
      component: PruebaPage,
      componentProps: {
       nuevo:"https://checkout-test.placetopay.ec/session/553976/f356e5a2b4a844e0b4602dc8deaf4d6a"
      }

    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log(data)
    try {


      //this.cargarUsuarios();


    } catch (error) {
      console.log('error');
    } */
    //externo();
    
/* 
    const promise = new Promise((resolve, reject) => {
      
      var a = resolve(externo("https://checkout-test.placetopay.ec/session/554097/e129fa17e3116404a9b0a7d34ec96789"));
  });
  promise.then((res) => {
      console.log('I get called:', res); // Devuelve: true
  });
  promise.catch((err) => {
      // Nuca es utilizado
  }); */

  
  const promise = new Promise((resolve, reject) => {
      console.log("aki")
    resolve(externo("https://checkout-test.placetopay.ec/session/554129/a3dbf1ba28414b0dc6dba0bd8d9b0cbf"));
  
});
promise.then((res) => {

  
  var p = guardado();

  console.log(p)
  console.log(h)

  /* var p =localStorage.getItem('datos')
  console.log(p);
 */
});


      
    

   

   
    
  }


  customAlertOptions: any = {
    cssClass: 'customAlertCss',

  };
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
  chest:boolean=false;
  total: any;
  mens: any;
  impu: any;
  tot: any;
  plan: any;
  num:any;
  num2:any;
  colorButon: any;
  color: any;
  cuentabroker: any;
  nombrePrima: any = "Mensual";
  parentesco1: any = "TITULAR";
  conteoBeneficiarios: any = "";
  listaPlanes: any = [];
  ciudades: any = [];
  ciudad: any;
  estadobroker: boolean;
  mostrar1:boolean=true;
  mostrar2:boolean=false;
  listaBrokers: any;
  broker: any = null;
  botones: boolean;
  listaFrecuenciapagos: any = ["Mensual", "Semestral", "ANUAL"];
  frecuenciPagos: any = "";

  tresDatos:boolean;

  //words2 = [{edad:"",genero:"",parentesco:""}];
  words2: any = [];
  parentescos: any = ["CONYUGE", "HERMANO(A)", "HIJO(A)", "SUEGRO(A)"];
  listaEdades: any = [];
  listaEstados: any = ["CASADO(A)", "DIVORCIADO(A)", "SOLTERO(A)", "UNIÓN LIBRE", "UNIÓN DE HECHO", "VIUDO(A)"];

  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Datos", "Beneficiarios", "Plan",
    "Información", "Finalizar"];
  public orderStatus = "Datos"

  sig = document.getElementById("siguiente");
  constructor(private conexionService: ConexionService, private loadingController: LoadingController,
     private alertController: AlertController,private modalController:ModalController) { }
  ngOnInit() {

    this.botones = true;
    this.getBrokers();
    this.colorButon = "height: 100%; width: 100%; color: black; background-color: #f5f5f5; border-color: #f5f5f5;"
    this.color = "asdfasdfaa"
    this.listaEdades = "";
    this.estado5 = true;
    //this.estado3 = true

    this.atras = true;
    /*  this.conexionService.login('0919485359','0919485359').subscribe(data => {
       console.log(data);
     }, error => {
       console.log(error);
     } );
 
 */

    this.getEdades();
    this.getCiudades()

    this.conexionService.planes().subscribe(data => {
      console.log(data);

    }, error => {
      console.log(error);
    });


  }



  buttonIcon: string = "md-add";
  color1: string = "black";

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
  getEdades() {
    this.listaEdades = "";
    this.conexionService.getEdades().subscribe(data => {
      console.log(data["message"]);
      this.listaEdades = data["message"].datoList;
    }, error => {
      console.log(error);
    });
  }
  getPlanes(datos) {
    this.listaPlanes = "";
    this.conexionService.getPlanes(datos).subscribe(data => {
      console.log(data["message"].datoList);
     
      this.listaPlanes = data["message"].datoList;
      console.log(this.listaPlanes.length);
      if (this.listaPlanes.length <= 3) {
        this.tresDatos=true;
      }else{
        this.tresDatos=false;
      }

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
      // console.log(this.ciudades)
    }, error => {
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
        this.alertError("Alerta!", 'Llene todos los campos');
        this.currentactive--;
        (<HTMLSelectElement>document.getElementById("atras")).disabled = true;
      }
      else {
        var ced = this.validadorDeCedula(String(this.cedulaTitular));

        var email = this.validarEmail(String(this.correo1))
        var edad = this.calculoEdad(this.fechanacTitular)


        if (edad >= 0 && edad <= 17) {
          this.edad1 = "0-17";

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
        if (ced == true && email == true) {


          this.update();
          (<HTMLSelectElement>document.getElementById("atras")).disabled = false;

        } else if (ced == false) {
          this.currentactive--;
          this.alertError("Alerta!", 'Ingrese una cedula valida');
        }
        else if (email == false) {
          this.currentactive--;
          this.alertError("Alerta!", 'Ingrese un correo valido');
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
        this.alertError("Alerta!", 'Llene todos los campos');
      }


    } else if (this.currentactive == 4) {

      console.log("entro 4");
      console.log(this.plan);

      if (this.plan == "" || this.plan == undefined) {
        this.alertError("Alerta!", 'Elija un plan');
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
        this.alertError("Alerta!", 'Llene todos los campos');

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

        this.orderStatus = element;
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
        this.conteoBeneficiarios = this.words2.length;
        if (this.conteoBeneficiarios === 0) {

          var soloTitular = [{ rango_edad: this.edad1, genero: this.genero1 }];
          console.log(soloTitular);
          this.getPlanes(soloTitular);
        } else {

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

  before() {



    console.log(this.currentactive);

    this.counts.forEach((element, i) => {
      console.log(i);
      if (i < this.currentactive) {
        i--;
        console.log(i);
        this.orderStatus = element;
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
    console.log(this.direccionTitular);

    console.log(this.plan);
    console.log(this.words2)


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
    this.registro.ciudad = this.ciudad.name;
    this.registro.direccion = this.direccionTitular;
    this.registro.telefono = String(this.telefono1);
    this.registro.celular = String(this.celular1);
    this.registro.plan = this.plan;
    if (this.words2.length == 0) {
      this.registro.beneficiarios = "";
    } else {
      this.registro.beneficiarios = this.words2;
    }

    console.log(this.registro);
    this.conexionService.insertDatos(this.registro).subscribe(data => {
      console.log(data.message);
      this.frecuenciPagos = "Mensual"
      this.mens = data.message.datoList[0].prima_mensual;
      this.impu = data.message.datoList[0].impuestos;
      this.tot = data.message.datoList[0].total;
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

  calculoEdad(fecha) {
    /* console.log($event.target.value);
    var fecha=$event.target.value */
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    console.log(edad)

    return edad;

  }

  async consultarCedula($event) {
    //console.log($event.target.value);
    var cedula=$event.target.value;
    console.log(cedula.length)

    if (cedula.length == 10) {

      var cedvalida= this.validadorDeCedula(cedula);

      console.log("realizar consulta")

      if (cedvalida == true) {
        const loading = await this.loadingController.create({ message: 'Consultando ...' })
        await loading.present();

        this.conexionService.verificarExistencia(cedula).subscribe(res=>{
          console.log(res)
          var persona = res.message

          if (persona == false) {
            this.nombre1="";
          this.apellido1="";
          this.fechanacTitular="";
          this.genero1="";
          this.celular1="";
          this.correo1="";
            document.getElementById("nombre1")["disabled"]=false;
          document.getElementById("apellido1")["disabled"]=false;
          document.getElementById("fechanacTitular")["disabled"]=false;
          document.getElementById("genero1")["disabled"]=false;
          document.getElementById("celular1")["disabled"]=false;
          document.getElementById("correo1")["disabled"]=false;
            
          }else{
          console.log(persona[0].nombres)

          this.nombre1=persona[0].nombres;
          this.apellido1=persona[0].apellidos;
          this.fechanacTitular=persona[0].fecha_nac;
          this.genero1=persona[0].genero;
          this.celular1=persona[0].telefonos;
          this.correo1=persona[0].correo;
          document.getElementById("nombre1")["disabled"]=true;
          document.getElementById("apellido1")["disabled"]=true;
          document.getElementById("fechanacTitular")["disabled"]=true;
          document.getElementById("genero1")["disabled"]=true;
          document.getElementById("celular1")["disabled"]=true;
          document.getElementById("correo1")["disabled"]=true;
         

        }
          loading.dismiss();
        })
        
      } else if (cedvalida == false) {
        this.currentactive--;
        this.alertError("Alerta!", 'Ingrese una cedula valida');
      }

     


      
    }


    /* var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    console.log(edad)

    return edad; */

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

  async alertError(titulo, mensaje) {
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



        }
      }]
    });

    await alert.present();
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

 async guardar() {

    this.validar = new Validar();
    this.validar.cedula = this.cedulaTitular;

    this.validar.frecuencia = this.frecuenciPagos;
    if (this.cuentabroker == "SI") {
      this.validar.broker = this.broker.parent;
    } else if (this.cuentabroker == "NO") {
      this.validar.broker = null;
    }

    console.log(this.validar)

    if (this.cuentabroker == undefined || this.cuentabroker == "") {
      this.alertError("Alerta!", 'Seleccione si cuenta con un Broker');
    } else {
console.log("Proceder al pago")

this.conexionService.guardarSuscripcion().subscribe(res=>{
  console.log(res)
})

  /*     console.log("guardar")
      const loading = await this.loadingController.create({ message: 'Registrando Informacion ...' })
      await loading.present();
      this.conexionService.validarDatos(this.validar).subscribe(res => {
        console.log(res)
        loading.dismiss();
        this.alertExito("Pago Realizado", 'Revise su correo para acceder a la informacion');
      }) */
    }

  }


  activar($event,item){

    this.mostrar1=false;
    this.mostrar2=true;


    
  }
  activar2($event,item){
 
    this.mostrar1=true;
    this.mostrar2=false;
  }

  seleccionPlan($event,item){
    console.log($event);
    console.log($event.target.checked);
    console.log($event.target.id);
    console.log(item);
    console.log(this.listaPlanes);
    var estado:boolean;



/*     var cambio = document.getElementById("LITE 20")
    cambio["checked"]=true;
    this.plan = item; */

    this.listaPlanes.forEach(element => {
      console.log(element.plan)
      console.log(item)

      if ($event.target.id == element.plan) {
    /* var cambio = document.getElementById($event.target.id)
    cambio["checked"]=false; */
    this.plan = item;
    estado = false;
        
      }else{
        var cambio = document.getElementById(element.plan)
    cambio["checked"]=false;
      }
    
      
    });
    var cambio = document.getElementById($event.target.id)
    cambio["checked"]=estado;

    console.log(this.plan)
  }
}
