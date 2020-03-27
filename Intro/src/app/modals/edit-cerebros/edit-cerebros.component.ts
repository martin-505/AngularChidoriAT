import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'modal-edit-cerebros',
  templateUrl: './edit-cerebros.component.html',
  styleUrls: ['./edit-cerebros.component.css']
})
export class EditCerebrosComponent implements OnInit {
  @ViewChild('modalCerebrosEditar') public modal: ElementRef;

  cerebro:any;

  cerebroForm:any;

  registrado:boolean;3

  errorFlavor: boolean;
  errorDescription: boolean;
  errorPRICE: boolean;
  errorPicture: boolean;

  error: any;

  flavor: string;
  description: string;
  price: number;
  picture: string;

  cerebros: any;

  constructor(private dataService: DataService, private _renderer: Renderer2) { }

  ngOnInit(): void {
    
    this.flavor = '';
    this.price = null;
    this.picture = '';
    this.description = '';
  }
  guardarCerebro() {
  let cerebro = this.dataService.cerebroEditar;
  this.dataService.actualizarCerebro( this.flavor, this.description, this.price, this.picture, cerebro)
   .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.dataService.obtenerCerebros();

      this.errorDescription = false;
      this.errorFlavor = false;
      this.errorPRICE = false;
      this.errorPicture = false;

      this.flavor = '';
      this.price = null;
      this.picture = '';
      this.description = '';

    }, (error) => {
      this.error = error;
      if (error.error.text.flavor) {
        this.errorFlavor = true;
      }
      if (error.error.text.description) {
        this.errorDescription = true;
      }
      if (error.error.text.price) {
        this.errorPRICE = true;
      }
      if (error.error.text.picture) {
        this.errorPicture = true;
      }
    });
  }

 cargarDatos(){
    this.cerebroForm = this.dataService.cerebro;
    console.log(this.cerebroForm);
    this.flavor=this.cerebroForm.flavor;
    this.description=this.cerebroForm.description;
    this.price=this.cerebroForm.price;
    this.picture=this.cerebroForm.picture;
 }
 clean(){
       
  this.flavor = '';
  this.price = null;
  this.picture = '';
  this.description = '';
 }


}
  

