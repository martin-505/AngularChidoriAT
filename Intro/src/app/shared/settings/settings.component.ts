import { Component, OnInit } from '@angular/core';
import {SettingsService} from './../../services/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    COLORS: Colors[] = [
    {background: 'bg-primary', text: 'text-light'},
    {background: 'bg-secondary', text: 'text-light'},
    {background: 'bg-success', text: 'text-dark'},
    {background: 'bg-info', text: 'text-dark'},
    {background: 'bg-warning', text: 'text-dark'},
    {background: 'bg-danger', text: 'text-light'},
    {background: 'bg-light', text: 'text-dark'},
    {background: 'bg-dark', text: 'text-light'},
    {background: 'bg-focus', text: 'text-light'},
    {background: 'bg-alternate', text: 'text-light'},
    {background: 'bg-vicious-stance', text: 'text-light'},
    {background: 'bg-midnight-bloom', text: 'text-light'},
    {background: 'bg-night-sky', text: 'text-light'},
    {background: 'bg-slick-carbon', text: 'text-light'},
    {background: 'bg-asteroid', text: 'text-light'},
    {background: 'bg-royal', text: 'text-light'},
    {background: 'bg-warm-flame', text: 'text-dark'},
    {background: 'bg-night-fade', text: 'text-dark'},
    {background: 'bg-sunny-morning', text: 'text-dark'},
    {background: 'bg-tempting-azure', text: 'text-dark'},
    {background: 'bg-amy-crisp', text: 'text-dark'},
    {background: 'bg-heavy-rain', text: 'text-dark'},
    {background: 'bg-mean-fruit', text: 'text-dark'},
    {background: 'bg-malibu-beach', text: 'text-light'},
    {background: 'bg-deep-blue', text: 'text-dark'},
    {background: 'bg-ripe-malin', text: 'text-light'},
    {background: 'bg-arielle-smile', text: 'text-light'},
    {background: 'bg-plum-plate', text: 'text-light'},
    {background: 'bg-happy-fisher', text: 'text-dark'},
    {background: 'bg-happy-itmeo', text: 'text-light'},
    {background: 'bg-mixed-hopes', text: 'text-light'},
    {background: 'bg-strong-bliss', text: 'text-light'},
    {background: 'bg-grow-early', text: 'text-light'},
    {background: 'bg-love-kiss', text: 'text-light'},
    {background: 'bg-premium-dark', text: 'text-light'},
    {background: 'bg-happy-green', text: 'text-light'},
  ];

  colors = this.COLORS;

  constructor(public _ajustes: SettingsService) { }

  CambiarColor(color: string, element:string)
  {
    if(element === 'header'){
      this._ajustes.ajustes.temaEncabezado = color;
    } else if(element === 'sidebar'){
      this._ajustes.ajustes.temaMenuLateral = color;
    }
    this._ajustes.guardarAjustes();
  }

  ngOnInit(): void {
    this._ajustes.cargarAjustes();
  }

  seleccionar(event, element)
  {
    console.log(event.target.dataset.class);
    this.CambiarColor(event.target.dataset.class, element);
  }

}
interface Colors{
  background: string,
  text: string
}



