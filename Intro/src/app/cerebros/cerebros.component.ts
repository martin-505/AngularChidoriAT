import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-cerebros',
    templateUrl: './cerebros.component.html',
    styleUrls: ['./cerebros.component.css']
})
export class CerebrosComponent implements OnInit {
    cerebros: any;
    static id: string;
    static sabor: string;
    static descripcion: string;
    static iq: string;
    static imagen: string;
    static trigger: number;

    constructor(private _dataService: DataService) { }

    ngOnInit(): void {
        console.log('Actualizando tabla');
        this.actualizarTabla();
    }

    actualizarTabla() {
        this._dataService.cerebrosObservable
        .subscribe((resultadoC) => {
          this.cerebros = resultadoC;
        });

        this._dataService.obtenerCerebros();
    }

    obtenerCerebro(cerebro) {
        console.log(cerebro);

        CerebrosComponent.id = JSON.stringify(cerebro._id);
        CerebrosComponent.sabor = JSON.stringify(cerebro.flavor);
        CerebrosComponent.descripcion = JSON.stringify(cerebro.description);
        CerebrosComponent.iq = JSON.stringify(cerebro.iq);
        CerebrosComponent.imagen = JSON.stringify(cerebro.picture);
        CerebrosComponent.trigger = 1;
    }

    eliminarCerebros(ID) {
        console.log(ID);
        this._dataService.eliminarCerebro(ID)
        .subscribe((resultado) => console.log(resultado));
        this.actualizarTabla();
    }

}
