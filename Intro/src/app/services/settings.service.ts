import { Injectable, OnInit, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class SettingsService implements OnInit {

  ajustes: Ajustes = {
    temaEncabezado: '',
    temaMenuLateral: ''
  };

  constructor(@Inject(DOCUMENT) private _document) {
  }

  ngOnInit() {
    this.cargarAjustes();
  }

  guardarAjustes() {
    console.log('Guardado en localstorage.');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  aplicar() {
    console.log('aplicando...');
    this._document.getElementsByClassName('app-header')[0].setAttribute('class', 'app-header header-shadow ' + this.ajustes.temaEncabezado);
    this._document.getElementsByClassName('app-sidebar')[0].setAttribute('class', 'app-sidebar sidebar-shadow ' + this.ajustes.temaMenuLateral); 
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargando ajustes...');
    } else {
      console.log('Se cargaron los ajustes por defecto.');
    }

    this.aplicar();
  }
}

interface Ajustes {
  temaEncabezado: string;
  temaMenuLateral: string;
}
