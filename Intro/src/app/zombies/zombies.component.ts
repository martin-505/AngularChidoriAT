import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-zombies',
    templateUrl: './zombies.component.html',
    styleUrls: ['./zombies.component.css']
})
export class ZombiesComponent implements OnInit {
    zombies: any;
    static id: string;
    static nombre: string;
    static correo: string;
    static tipo: string;
    static trigger: number;

    constructor(private _dataService: DataService) { }

    ngOnInit(): void {
        console.log('Actualizando tabla');
        this.actualizarTabla();
    }

    actualizarTabla() {
      this._dataService.zombiesObservable
      .subscribe((resultadoZ) => {
        this.zombies = resultadoZ;
      });

      this._dataService.obtenerZombies();
    }

    obtenerZombie(zombie) {
      console.log(zombie);

      ZombiesComponent.id = JSON.stringify(zombie._id);
      ZombiesComponent.nombre = JSON.stringify(zombie.name);
      ZombiesComponent.correo = JSON.stringify(zombie.email);
      ZombiesComponent.tipo = JSON.stringify(zombie.type);
      ZombiesComponent.trigger = 1;
  }

    eliminarZombies(ID) {
      console.log(ID);
      this._dataService.eliminarZombie(ID)
      .subscribe((resultado) => console.log(resultado));
      this.actualizarTabla();
    }

}
