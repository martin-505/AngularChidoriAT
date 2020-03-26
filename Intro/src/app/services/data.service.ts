import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

let apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private updateZombies$ = new Subject<any>();
    zombiesObservable = this.updateZombies$.asObservable();

    private updateCerebros$ = new Subject<any>();
    cerebrosObservable = this.updateCerebros$.asObservable();

    private updateUsuarios$ = new Subject<any>();
    usuariossObservable = this.updateUsuarios$.asObservable();

    constructor(private _client: HttpClient) { }

    //ZOMBIES

    async obtenerZombies() {
        let zombies = await this._client.get<any>(apiUrl + 'zombies');
        console.log(zombies);
        return this.updateZombies$.next(zombies);
    }

    agregarZombie(nombre: string, correo: string, tipo: string) {
        let nuevoZombie = {
            name: nombre,
            email: correo,
            type: tipo
        };

        return this._client.post(apiUrl + 'zombies/new', nuevoZombie);

    }

    eliminarZombie(ID: string) {
        return this._client.delete(`${apiUrl}zombies/delete/${ID}`);
    }

    actualizarZombie(numero: string, nombre: string, correo: string, tipo: string) {
        let editarZombie = {
            name: nombre,
            email: correo,
            type: tipo
        };

        return this._client.put(apiUrl + 'zombies/edit/' + numero, editarZombie);

    }

    //CEREBROS

    async obtenerCerebros() {
        let cerebros = await this._client.get<any>(apiUrl + 'cerebros');
        console.log(cerebros);
        return this.updateCerebros$.next(cerebros);
    }

    agregarCerebro(sabor: string, descripcion: string, IQ: number, imagen: string) {
        let nuevoCerebro = {
            flavor: sabor,
            description: descripcion,
            iq: IQ,
            picture: imagen
        };

        return this._client.post(apiUrl + 'cerebros/new', nuevoCerebro);

    }

    eliminarCerebro(numero: string) {
        return this._client.delete(`${apiUrl}cerebros/delete/${numero}`);
    }

    actualizarCerebro(numero: string, sabor: string, descripcion: string, IQ: number, imagen: string) {
        let editarCerebro = {
            flavor: sabor,
            description: descripcion,
            iq: IQ,
            picture: imagen
        };

        return this._client.put(apiUrl + 'cerebros/edit/' + numero, editarCerebro);

    }

    //USUARIOS

    async obtenerUsuarios() {
        let usuarios = await this._client.get<any>(apiUrl + 'users');
        console.log(usuarios);
        return this.updateUsuarios$.next(usuarios);
    }

    agregarUsuario(nombre: string, correo: string, contraseña: string) {
        let nuevoUsuario = {
            name: nombre,
            email: correo,
            password: contraseña
        };

        return this._client.post(apiUrl + 'users/new', nuevoUsuario);

    }

}
