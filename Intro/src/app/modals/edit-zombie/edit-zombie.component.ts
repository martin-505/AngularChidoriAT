import { Component, OnInit, Renderer2, ElementRef, ViewChild, NgModule } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { async } from '@angular/core/testing';
// import { format } from 'path';

@Component({
  selector: 'modal-edit-zombie',
  templateUrl: './edit-zombie.component.html',
  styleUrls: ['./edit-zombie.component.css']
})
export class EditZombieComponent implements OnInit {
  @ViewChild('modal2') public modal :ElementRef;
  nombre:string;
  email:string;
  tipo:string;
  zombies:any;

  error:any;
  errorMail:boolean;
  errorName:boolean;
  errorType:boolean;

  zombie:any;

  constructor(private dataService : DataService, private _renderer : Renderer2 ) { }

  ngOnInit(): void {
  }

  

  editarZombie(){
    this.zombie= this.dataService.zombieEditar;
    let idZombie=this.zombie;

    this.dataService.actualizarZombie(this.nombre,this.email,this.tipo, idZombie).subscribe((resultado)=>
    {
      console.log('sisirve');
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.dataService.obtenerZombies();

      this.errorName = false;
      this.errorMail = false;
      this.errorType = false;
    },
    (error)=>
    {
      console.log(error);
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
