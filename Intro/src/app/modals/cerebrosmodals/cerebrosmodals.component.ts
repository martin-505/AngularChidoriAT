import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'modal-cerebros',
  templateUrl: './cerebrosmodals.component.html',
  styleUrls: ['./cerebrosmodals.component.css']
})
export class CerebrosModalsComponent implements OnInit {
  @ViewChild('modalCerebros') public modal: ElementRef;
  errorFlavor: boolean;
  errorDescription: boolean;
  errorIQ: boolean;
  errorPicture: boolean;

  error: any;

  flavor: string;
  description: string;
  iq: number;
  picture: string;

  cerebros: any;

  constructor(private dataService: DataService, private _renderer: Renderer2) { }

  ngOnInit(): void {

  }
  guardarCerebro() {
    this.dataService.agregarCerebro(this.flavor, this.description, this.iq, this.picture).subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.dataService.obtenerCerebros();

      this.errorDescription = false;
      this.errorFlavor = false;
      this.errorIQ = false;
      this.errorPicture = false;

      this.flavor = '';
      this.iq = null;
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
      if (error.error.text.iq) {
        this.errorIQ = true;
      }
      if (error.error.text.picture) {
        this.errorPicture = true;
      }
    });
  }
}
