import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'modal-zombies',
  templateUrl: './zombiesmodals.component.html'
})
export class ZombiesModalsComponent implements OnInit {
@ViewChild('modal') public modal :ElementRef;
  error:any;
  errorMail:boolean;
  errorName:boolean;
  errorType:boolean;
  nombre:string;
  email:string;
  tipo:string;
  zombies:any;
  constructor(private dataService : DataService, private _renderer : Renderer2 ) { }

  ngOnInit(): void {
  }
  guardarZombie(){
    console.log(this.nombre, this.tipo, this.email);
    this.dataService.agregarZombie(this.nombre, this.email, this.tipo).subscribe((resultado)=>{
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement,true).click();
     this.dataService.obtenerZombies();
     
     this.errorName = false;
     this.errorMail = false;
     this.errorType = false;
    }, (error) => {
      this.error=error;
      if(error.error.text.name){
        this.errorName=true;
        console.log(error.error.text.name.message);
      }
      if(error.error.text.email){
        this.errorMail=true;
        console.log(error.error.text.email.message);
      }
      if(error.error.text.type){
        this.errorType=true;
        console.log(error.error.text.type.message);
      }
    }
    
    );
  }
  

}
