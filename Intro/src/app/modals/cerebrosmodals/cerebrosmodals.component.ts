import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CerebrosComponent } from 'src/app/cerebros/cerebros.component';

@Component({
  selector: 'modal-cerebros',
  templateUrl: './cerebrosmodals.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class CerebrosmodalsComponent implements OnInit {
    @ViewChild('modalG') public modalG: ElementRef;
    @ViewChild('modalA') public modalA: ElementRef;
    @ViewChild('error') public error2: ElementRef;

    sabor: string;
    descripcion: string;
    iq: number;
    imagen: string;
    ID: string;

    saborE: string;
    descripcionE: string;
    iqE: number;
    imagenE: string;
    IDE: string;

    cerebros: any;
    error: string;
    trigger: string;

    constructor( private dataService: DataService, private _renderer: Renderer2) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(): void {
        this.trigger = String(CerebrosComponent.trigger);
        console.log(this.trigger);
        if (this.trigger === "1") {
            this.IDE = CerebrosComponent.id.replace(/["]+/g, '');
            this.saborE = CerebrosComponent.sabor.replace(/["]+/g, '');
            this.descripcionE = CerebrosComponent.descripcion.replace(/["]+/g, '');
            this.iqE = Number(CerebrosComponent.iq);
            this.imagenE = CerebrosComponent.imagen.replace(/["]+/g, '');
            CerebrosComponent.trigger = 0;
        }
      }

    actualizarTabla() {
        this.dataService.cerebrosObservable
        .subscribe((resultadoC) => {
        this.cerebros = resultadoC;
        });

        this.dataService.obtenerCerebros();
    }

    guardarCerebro() {
        let al = document.getElementById('alertaGuardar');
        al.innerHTML = '';
        console.log(this.sabor, this.descripcion, this.iq, this.imagen);
        this.dataService.agregarCerebro(this.sabor, this.descripcion, this.iq, this.imagen)
        .subscribe((resultado) => {
        console.log(resultado);
        this._renderer.selectRootElement(this.modalG.nativeElement, true).click();
        this.dataService.obtenerCerebros();
        this.ID = '';
        this.sabor = '';
        this.descripcion = '';
        this.iq = 0;
        this.imagen = '';
        }, (error) => {
            console.log(error);
            al.innerHTML = al.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
                "<strong>" + error.error.mensajeErrorC +"</strong>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+
                "</button>"+
                "</div>";
        });
        this.actualizarTabla();
    }

    actualizarCerebro() {
        let al = document.getElementById('alertaActualizar');
        al.innerHTML = '';
        console.log(this.IDE, this.saborE, this.descripcionE, this.iqE, this.imagenE);
        this.dataService.actualizarCerebro(this.IDE, this.saborE, this.descripcionE, this.iqE, this.imagenE)
        .subscribe((resultado) => {
        console.log(resultado);
        this._renderer.selectRootElement(this.modalA.nativeElement, true).click();
        this.dataService.obtenerCerebros();
        CerebrosComponent.id = '0';
        CerebrosComponent.sabor = '';
        CerebrosComponent.descripcion = '';
        CerebrosComponent.iq = '';
        CerebrosComponent.imagen = '';
    }, (error) => {
        console.log(error);
        al.innerHTML = al.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
            "<strong>" + error.error.mensajeErrorC +"</strong>" +
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                "<span aria-hidden='true'>&times;</span>"+
            "</button>"+
            "</div>";
    });
    }

}
