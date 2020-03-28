import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

let apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class DataService {

  zombieEditar: any;
  cerebroEditar: any;

  logged:boolean;

  cerebro:any;

  
  
  private updateZombies$ = new Subject<any>();
  zombiesObservable = this.updateZombies$.asObservable();

  private updateCerebros$ = new Subject<any>();
  cerebrosObservable = this.updateCerebros$.asObservable();

  
  constructor(private _client: HttpClient) {
   }

   async obtenerZombies() {
     let zombies = await this._client.get<any>(apiUrl + 'zombies');
     console.log(zombies);
    return this.updateZombies$.next(zombies);
   }
  async obtenerCerebros() {
     let cerebros= await this._client.get<any>(apiUrl+'cerebros');
    return this.updateCerebros$.next(cerebros);
   }

   async getCerebro(){
     let cerebro = await this._client.get<any>(apiUrl + 'cerebro/' + this.cerebroEditar);
     return cerebro;
   }

   agregarZombie(nombre: string, correo: string, tipo: string) {
    let nuevoZombie = {
      name: nombre,
      email : correo,
      type: tipo
    }
      return this._client.post(apiUrl + 'zombies/new', nuevoZombie);
   }

   agregarCerebro(flavor:string,description:string,price:number,picture:string)
   {
    let nuevoCerebro={
      flavor:flavor,
      description:description,
      price:price,
      picture:picture
    }
    return this._client.post(apiUrl+'cerebros/new',nuevoCerebro);
   }
   eliminarCerebro(idCerebro){
    return this._client.delete(apiUrl+'cerebro/delete/'+idCerebro);
   }

   eliminarZombie(idZombie){
   return this._client.delete(`${apiUrl}zombie/delete/${idZombie}`);
   }

  actualizarCerebro(flavor:string,description:string,price:number,picture:string, idCerebro){
    let Cerebro ={
      flavor:flavor,
      description:description,
      price:price,
      picture:picture,
    }
      return  this._client.put(apiUrl+'cerebro/edit/'+idCerebro,Cerebro);
    
   }
actualizarZombie(nombre: string, correo: string, tipo: string,idZombie){
     let Zombie={
      name:nombre,
      email:correo,
      type:tipo
     }
     return this._client.put(apiUrl+'zombie/edit/'+idZombie,Zombie);
   }


  submitRegister(user:any){
    return this._client.post(apiUrl+'register',user);
  }
  login(credentials:any){
    return this._client.post(apiUrl+'login ',credentials);
  }

  getUserName(){
   return this._client.get(apiUrl+'username',{
     observe: 'body',
     params: new HttpParams().append('token',localStorage.getItem('token'))
   });
  }















}

