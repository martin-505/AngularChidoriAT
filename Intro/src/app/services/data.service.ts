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
   /*
    logout(){
     console.log('funct')
    return this._client.get<any>(apiUrl+'logout');
   }

   getUserInfo(){
     let user= this._client.get<any>(apiUrl+'user');
     console.log(user);
     return user;
   }

   auth(){
    return this._client.get<any>(apiUrl+'auth');
   }
   logIn(credentials){
      console.log(credentials);
    return this._client.post(apiUrl+'login',credentials);
   }
   createUser(user){
     console.log(user);
    return this._client.post(apiUrl + 'signup', user);
   }*/

   //---------GET--------
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
      //---------GET--------




      //---------------CREATE---------------------
   agregarZombie(nombre: string, correo: string, tipo: string) {
    let nuevoZombie = {
      name: nombre,
      email : correo,
      type: tipo
    }
      return this._client.post(apiUrl + 'zombies/new', nuevoZombie);
   }

   agregarCerebro(flavor:string,description:string,iq:number,picture:string)
   {
    let nuevoCerebro={
      flavor:flavor,
      description:description,
      iq:iq,
      picture:picture
    }
    return this._client.post(apiUrl+'cerebros/new',nuevoCerebro);
   }

    //---------------CREATE---------------------



    //----------------DELETE--------------------
   eliminarCerebro(idCerebro){
    return this._client.delete(apiUrl+'cerebro/delete/'+idCerebro);
   }

   eliminarZombie(idZombie){
   return this._client.delete(`${apiUrl}zombie/delete/${idZombie}`);
   }
   //----------------DELETE--------------------



   //-----------UPDATE----------------------

  actualizarCerebro(flavor:string,description:string,iq:number,picture:string, idCerebro){
    let Cerebro ={
      flavor:flavor,
      description:description,
      iq:iq,
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
  //-----------UPDATE----------------------

  //--LOGIN--

  //--REGISTER--

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

