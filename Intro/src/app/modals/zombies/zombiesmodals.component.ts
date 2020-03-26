import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ZombiesComponent } from 'src/app/zombies/zombies.component';

@Component({
    selector: 'modal-zombies',
    templateUrl: './zombiesmodals.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class ZombiesModalsComponent implements OnInit {
    @ViewChild('modalZG') public modalZG: ElementRef;
    @ViewChild('modalZA') public modalZA: ElementRef;
    @ViewChild('error') public error2: ElementRef;

    nombre: string;
    email: string;
    tipo: string;
    ID: string;

    nombreE: string;
    emailE: string;
    tipoE: string;
    IDE: string;

    zombies: any;
    error: string;
    trigger: string;

    constructor(private dataService: DataService, private _renderer: Renderer2) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(): void {
        this.trigger = String(ZombiesComponent.trigger);
        console.log(this.trigger);
        if (this.trigger === "1") {
            this.IDE = ZombiesComponent.id.replace(/["]+/g, '');
            this.nombreE = ZombiesComponent.nombre.replace(/["]+/g, '');
            this.emailE = ZombiesComponent.correo.replace(/["]+/g, '');
            this.tipoE = ZombiesComponent.tipo.replace(/["]+/g, '');
            ZombiesComponent.trigger = 0;
        }
      }

    actualizarTabla() {
      this.dataService.zombiesObservable
      .subscribe((resultadoZ) => {
        this.zombies = resultadoZ;
      });

      this.dataService.obtenerZombies();
    }

    guardarZombie() {
        let alZ = document.getElementById('alertaGuardar');
        alZ.innerHTML = '';
        console.log(this.nombre, this.email, this.tipo);
        this.dataService.agregarZombie(this.nombre, this.email, this.tipo)
        .subscribe((resultado) => {
            console.log(resultado);
            this._renderer.selectRootElement(this.modalZG.nativeElement, true).click();
            this.dataService.obtenerZombies();
            this.ID = '';
            this.nombre = '';
            this.email = '';
            this.tipo = '';
        }, (error) => {
            console.log(error);
            alZ.innerHTML = alZ.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
                "<strong>" + error.error.mensajeError +"</strong>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+
                "</button>"+
                "</div>";
        });
        this.actualizarTabla();
    }

    actualizarZombie() {
        let alZ = document.getElementById('alertaActualizar');
        alZ.innerHTML = '';
        console.log(this.IDE, this.nombreE, this.emailE, this.tipoE);
        this.dataService.actualizarZombie(this.IDE, this.nombreE, this.emailE, this.tipoE)
        .subscribe((resultado) => {
            console.log(resultado);
            this._renderer.selectRootElement(this.modalZA.nativeElement, true).click();
            this.dataService.obtenerZombies();
            this.IDE = '';
            this.nombreE = '';
            this.emailE = '';
            this.tipoE = '';
        }, (error) => {
            console.log(error);
            alZ.innerHTML = alZ.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
                "<strong>" + error.error.mensajeError +"</strong>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+
                "</button>"+
                "</div>";
        });
        this.actualizarTabla();
    }

}
