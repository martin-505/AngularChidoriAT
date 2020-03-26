import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    sabor = '';
    iq = 0;
    descripcion = '';
    imagen = '';

    cerebros = [
    {
        sabor: 'chocolate',
        iq: 100,
        descripcion: 'Facil de partir',
        imagen: 'chocolate.jpg'
    },
    {
        sabor: 'fresa',
        iq: 80,
        descripcion: 'Facil de tener',
        imagen: 'fresa.jpg'
    },
    {
        sabor: 'dulce',
        iq: 50,
        descripcion: 'Facil de obtener',
        imagen: 'dulce.jpg'
    },
    {
        sabor: 'chicle',
        iq: 105,
        descripcion: 'Facil de comer',
        imagen: 'chicle.jpg'
    }
];

Agregar() {
    // alert('Este botón agrega cerebros');
    const cerebro = {
        sabor: this.sabor,
        iq: this.iq,
        descripcion: this.descripcion,
        imagen: this.imagen
    };

    this.cerebros.push(cerebro);
}

Actualizar(sabor: string, iq: number, descripcion: string, imagen: string) {
    this.cerebros.find(item => item.sabor == sabor).iq = this.iq;
    this.cerebros.find(item => item.sabor == sabor).descripcion = this.descripcion;
    this.cerebros.find(item => item.sabor == sabor).imagen = this.imagen;
    console.log(this.cerebros.find(item => item.sabor == sabor));
}

Borrar(sabor: string) {
    console.log(sabor);
    this.cerebros = this.cerebros.filter(item => item.sabor !== sabor);
}

}

