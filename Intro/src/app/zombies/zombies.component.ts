import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-zombies',
  templateUrl: './zombies.component.html',
  styleUrls: ['./zombies.component.css']
})
export class ZombiesComponent implements OnInit {
   
  zombies: any;
  idZombie:any;
  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    console.log('Actuializando Tabla...');
    this.actualizarTabla();
  }

  actualizarTabla(){
    this._dataService.zombiesObservable.subscribe((resultados) => {
      this.zombies = resultados;
    });
    this._dataService.obtenerZombies();
  }

  eliminarZombie(idZombie){
    
    this._dataService.eliminarZombie(idZombie).subscribe(function(){
      console.log("Se elimino "+idZombie);
    });
    this._dataService.obtenerZombies();
  }

  actSeleccion(idZombie){
    this._dataService.zombieEditar = idZombie;
  }
}
