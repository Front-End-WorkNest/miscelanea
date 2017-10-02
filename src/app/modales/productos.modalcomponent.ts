import { Component } from '@angular/core';
//import { RopaService } from '../services/ropa.service';


@Component({
    selector:'modalProducto',
    templateUrl: './productos.modalcomponent.html'
})

export class ProductoModalComponent
{
    public title:string;
    constructor()
    {
        this.title = "Agregar Producto";
    }
}