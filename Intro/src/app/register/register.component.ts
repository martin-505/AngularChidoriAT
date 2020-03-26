import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  @ViewChild('modal') public modal: ElementRef;
  @ViewChild('error') public error2: ElementRef;

  nombre: string;
  correo: string;
  contraseña: string;

  constructor( private dataService: DataService, private _renderer: Renderer2) { }

  ngOnInit(): void {
  }

  guardarUsuario() {
    console.log(this.nombre, this.correo, this.contraseña);
    this.dataService.agregarUsuario(this.nombre, this.correo, this.contraseña)
    .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.dataService.obtenerUsuarios();
    }, (error) => {
        console.log(error);
        });
  }

  obtnerUsuario() {
    this.dataService.obtenerUsuarios();
}
}
