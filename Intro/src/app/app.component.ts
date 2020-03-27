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
    price = 0;
    descripcion = '';
    imagen = '';

    cerebros = [
    {
        sabor: 'chocolate',
        price: 100,
        descripcion: 'Facil de partir',
        imagen: 'chocolate.jpg'
    },
    {
        sabor: 'chocolate',
        price: 80,
        descripcion: 'Facil de tener',
        imagen: 'fresa.jpg'
    },
    {
        sabor: 'vainilla',
        price: 50,
        descripcion: 'Facil de obtener',
        imagen: 'hehe.jpg'
    },
    {
        sabor: 'chocolate',
        price: 105,
        descripcion: 'Facil de comer',
        imagen: 'hehe.jpg'
    }
];

Agregar() {
    // alert('Este botón agrega cerebros');
    const cerebro = {
        sabor: this.sabor,
        price: this.price,
        descripcion: this.descripcion,
        imagen: this.imagen
    };

    this.cerebros.push(cerebro);
}

Actualizar(sabor: string, price: number, descripcion: string, imagen: string) {
    this.cerebros.find(item => item.sabor == sabor).price = this.price;
    this.cerebros.find(item => item.sabor == sabor).descripcion = this.descripcion;
    this.cerebros.find(item => item.sabor == sabor).imagen = this.imagen;
    console.log(this.cerebros.find(item => item.sabor == sabor));
}

Borrar(sabor: string) {
    console.log(sabor);
    this.cerebros = this.cerebros.filter(item => item.sabor !== sabor);
}

}

