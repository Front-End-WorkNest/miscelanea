import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  //ARRAY DE PRODUCTOS
  carrito:any[][];

  //MODELO DE PRODUCTOS
  producto:Producto;

  //EDITAR
  editando:boolean;

  constructor() { 
    //INICIALIZACION DE ARRAY DE PRODUCTOS
    this.carrito = [];
    this.producto = new Producto('','','',0,0,0,null);
    this.editando = false;
  }

  ngOnInit() {
    console.log("secargo el componente carritos");
  }

  //AGREGAR PRODUCTOS Y CANTIDAD AL CARRITO
  pushProducto()//(producto,cantidad)
  {
    //var tamanio = this.carrito.length;INDICE ACTUAL

    //AGREGAR NOMBRE Y CANTIDAD AL CARRITO
    this.carrito.push([this.producto.nombre,this.producto.cantidad]);

    console.log('Carrito: '+this.carrito.toString());
    
    //localStorage.setItem('carrito',this.carrito.toString());

    //this.carrito[length][0] = this.producto.nombre;//producto;
    //this.carrito[length][1] = this.producto.cantidad;//cantidad;
  }

  //ELIMINAR PRODUCTO SELECCIONADO
  removeProducto(i)
  {
    console.log('INDEX: '+ i);
    this.carrito.splice(i,1);
  }

  editar(editando)
  {
    this.editando = editando;
  }

}
