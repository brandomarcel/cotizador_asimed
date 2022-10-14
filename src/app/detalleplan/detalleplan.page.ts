import { Component, Input, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalleplan',
  templateUrl: './detalleplan.page.html',
  styleUrls: ['./detalleplan.page.scss'],
})
export class DetalleplanPage implements OnInit {
  @Input() nuevo: string;
  html: any;
  constructor(private conexionService: ConexionService,
    private modalController: ModalController) { }

  ngOnInit() {

    this.getDetallePlanHTML(this.nuevo);
  }
  getDetallePlanHTML(plan) {
    this.conexionService.getDetallePlanHTML(plan).subscribe(res => {
     
      this.html = res['message'].datoList;
    }, error => {
      console.error(error);
    });
  }

  atras(){
    this.modalController.dismiss();
  }
}
