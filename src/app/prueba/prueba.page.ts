import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
@Input() nuevo;

  constructor(public modalController:ModalController) { }

  ngOnInit() {

    
    console.log(this.nuevo)
    var ventana= window.open(this.nuevo,'_system','location=yes')

    var tiempo= 0;
    var interval = setInterval(function(){
         //Comprobamos que la ventana no este cerrada

        if(ventana.closed !== false) {
          //Si la ventana ha sido cerrada, limpiamos el contador
          window.clearInterval(interval)
          //this.modalController.dismiss();
         alert(`Tiempo total: ${tiempo} s `)
         
        

        } else {
          //Mientras no se cierra la ventana sumamos los segundos
          tiempo +=1;
        }


    },1000)
    //this.modalController.dismiss();
    console.log(ventana)
    console.log(ventana.postMessage)
  }

}
