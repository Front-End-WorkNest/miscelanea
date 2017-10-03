import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  //ARRAY DE PRODUCTOS
  productos: Array<Producto>;

  //ARRAY DE PRODUCTOS [i][CODIGOBARRAS,CANTIDAD,PRECIOUNITARIO,SUBTOTAL]
  carrito: any[][];

  //MODELO DE PRODUCTOS
  producto: Producto;

  //EDITAR
  editando: boolean;

  //INDICE ACTUAL DE MODIFICACION
  index: number;
  //CANTIDAD ACTUAL DE MODIFICACION
  nuevaCantidad: number;
  //TOTAL
  total: number;

  constructor(
    private _router: Router
  ) {
    //localStorage.clear();

    //INICIALIZACION DE CARRITO
    this.productos = new Array();

    //INICIALIZACION DE ARRAY DE PRODUCTOS
    this.carrito = [];

    this.producto = new Producto('', '', '', 2, 0, 3, null);//CAMBIAR JORGITO ESTUPIDITO
    this.editando = false;
    this.nuevaCantidad = 0;
    this.total = 0;

    //CONVERSION DE STRING A OBJETO EN CASO DE QUE ESTE GUARDADO EN LOCALSTORAGE
    var string = localStorage.getItem('carrito');
    if (string) {
      console.log(string);
      this.productos = JSON.parse(string);
      for (var i = 0; i < this.productos.length; i++)
        this.total += this.productos[i].precioVenta*this.productos[i].cantidad;
    }

    /*DEPRECATED
    //CONVERSION DE STRING A OBJETO EN CASO DE QUE ESTE GUARDADO EN LOCALSTORAGE
    var string = localStorage.getItem('carrito');
    if (string) {
      var data = string.split(',');
      while (data[0])
        this.carrito.push(data.splice(0, 4));
      //INICIAR TOTAL
      for (var i = 0; i < this.carrito.length; i++)
        this.total += parseInt(this.carrito[i][3]);
    }
    */
  }

  ngOnInit() {
  }

  //AGREGAR PRODUCTOS Y CANTIDAD AL CARRITO
  pushProducto()//(producto,cantidad)
  {
    this.productos.push(this.producto);

    this.producto = new Producto('', '', '', 0, 0, 0, null);

    //GUARDAR EN LOCALSTORAGE
    this.guardarCambios();

    /*DEPRECATED
    //var tamanio = this.carrito.length;INDICE ACTUAL

    //AGREGAR NOMBRE Y CANTIDAD AL CARRITO
    this.carrito.push([this.producto.nombre, this.producto.cantidad, this.producto.precioVenta, (this.producto.precioVenta * this.producto.cantidad)]);

    console.log('Carrito: ' + this.carrito.toString());

    //GUARDAR EN LOCALSTORAGE
    this.guardarCambios();

    //this.carrito[length][0] = this.producto.nombre;//producto;
    //this.carrito[length][1] = this.producto.cantidad;//cantidad;
    */
  }

  //ELIMINAR PRODUCTO SELECCIONADO
  removeProducto(i) {
    this.productos.splice(i, 1);
    //GUARDAR EN LOCALSTORAGE
    this.guardarCambios();

    /*DEPRECATED
    this.carrito.splice(i, 1);
    //GUARDAR EN LOCALSTORAGE
    this.guardarCambios();
    */
  }

  modificarCantidad(i) {
    this.index = i;
    this.editando = true;
  }

  guardarCantidadModificada() {

    console.log('CODIGO_BARRAS-> '+this.productos[this.index].codigoBarras);
    this.productos[this.index].cantidad = this.nuevaCantidad;
    //this.productos[this.index].precioVenta = this.nuevaCantidad * this.producto.precioCompra;
    
    this.guardarCambios();
    
    this.editando = false;
    this.nuevaCantidad = 0;
    /*DEPRECATED
    //let precioUnitario = this.carrito[this.index][2] / this.carrito[this.index][1];
    this.carrito[this.index][1] = this.nuevaCantidad;
    this.carrito[this.index][3] = this.nuevaCantidad * this.carrito[this.index][2];//this.nuevaCantidad*precioUnitario;
    this.editando = false;
    this.nuevaCantidad = 0;
    //GUARDAR EN LOCALSTORAGE
    this.guardarCambios();
    */
  }

  guardarCambios() {
    //GUARDAR EN LOCALSTORAGE
    localStorage.setItem('carrito', JSON.stringify(this.productos));
    //ACTUALIZAR TOTAL
    this.total = 0;
    for (var i = 0; i < this.productos.length; i++)
      this.total += this.productos[i].precioVenta*this.productos[i].cantidad;

    /*DEPRECATED
    //GUARDAR EN LOCALSTORAGE
    localStorage.setItem('carrito', this.carrito.toString());
    //ACTUALIZAR TOTAL
    this.total = 0;
    for (var i = 0; i < this.carrito.length; i++)
      this.total += parseInt(this.carrito[i][3]);
      */
  }

  onSubmit() {
    //REINICIACION DE VALORES
    this.productos = new Array();
    localStorage.clear();
    this.total = 0;
    this.producto = new Producto('', '', '', 0, 0, 0, null);

    /*DEPRECATED
    console.log('se ha enviado');
    this.carrito = [];
    localStorage.clear();
    this.total = 0;
    this.producto = new Producto('', '', '', 0, 0, 0, null);
    //this._router.navigate(['/']);
    */
  }

}
