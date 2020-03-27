import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { EditCerebrosComponent } from '../modals/edit-cerebros/edit-cerebros.component';

@Component({
  selector: 'app-cerebros',
  templateUrl: 'cerebros.component.html',
  styleUrls: ['./cerebros.component.css']
})
export class CerebrosComponent implements OnInit {

  cerebros: any;

  constructor(private _dataService: DataService) { }

  
  ngOnInit(): void {
    this.actualizarTabla();

  }
  eliminarCerebro(idCerbro){
    console.log(idCerbro)
    this._dataService.eliminarCerebro(idCerbro).subscribe(function(){
       
    });
    this._dataService.obtenerCerebros();
  }

  actualizarTabla(){
    this._dataService.cerebrosObservable.subscribe((resultados) => {
      this.cerebros = resultados;
      console.log(this.cerebros);
    });
    this._dataService.obtenerCerebros();
  }

  actSeleccion(idCerebro, cerebro) {
    this._dataService.cerebroEditar = idCerebro;
    this._dataService.cerebro = cerebro;

    console.log(cerebro);
    
  }

}
