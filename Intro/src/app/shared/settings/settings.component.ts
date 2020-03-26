import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  public color: string;
  public color2: string;

  CambiarColor(colorEncabezado: string, colorMenuLateral: string) {
    this._ajustes.ajustes.temaEncabezado = colorEncabezado;
    this._ajustes.ajustes.temaMenuLateral = colorMenuLateral;

    this._ajustes.guardarAjustes();
  }

  ngOnInit(): void {
    this._ajustes.cargarAjustes();
  }

  seleccionar(event) {
    console.log(event.target.dataset.class);
    this.color = event.target.dataset.class;
    console.log('color1: ', this.color);
  }

  seleccionar2(event) {
    console.log(event.target.dataset.class);
    this.color2 = event.target.dataset.class;
    console.log('color2: ', this.color2);
  }

  cambio(){
    this.CambiarColor(this.color, this.color2);
  }

}
