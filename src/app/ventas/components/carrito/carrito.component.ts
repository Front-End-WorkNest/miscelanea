import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { Router } from '@angular/router';

//SERVICES
import { VentasService } from '../../../services/ventas.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [VentasService]
})

export class CarritoComponent implements OnInit {

  //MENSAJE DE ERROR
  mostrandoError: boolean;
  errMsg: string;

  //ARRAY DE PRODUCTOS
  productos: Array<Producto>;

  //ARRAY DE PRODUCTOS [i][CODIGOBARRAS,CANTIDAD,PRECIOUNITARIO,SUBTOTAL]
  carrito: any[][];

  //MODELO DE PRODUCTOS
  producto: Producto;

  //EDITAR
  editando: boolean;

  //VENTA VALIDA
  ventaValida: boolean;

  //LISTA VACIA
  listaVacia: boolean;

  //CODIGO DE BARRAS VALIDO
  existeProducto: boolean;
  //CANTIDADES CORRECTAS
  cantidadCorrecta: boolean;
  cantidadExistente: number;


  //INDICE ACTUAL DE MODIFICACION
  index: number;
  //CANTIDAD ACTUAL DE MODIFICACION
  nuevaCantidad: number;
  //TOTAL
  total: number;
  //PAGO
  pago: number;
  //CAMBIO
  cambio: number;

  constructor(
    private _router: Router,
    private _servicioVentas: VentasService
  ) {
    //localStorage.clear();

    //MENSAJE DE ERROR
    this.errMsg = '';
    this.mostrandoError = false;

    //INICIALIZACION DE CARRITO
    this.productos = new Array();

    //INICIALIZACION DE ARRAY DE PRODUCTOS
    this.carrito = [];

    this.producto = new Producto('', '', '', 0, 0, 0, null);//CAMBIAR JORGITO ESTUPIDITO
    this.producto.cantidad = 0;
    this.editando = false;
    this.existeProducto = false;
    this.cantidadCorrecta = true;
    this.ventaValida = false;
    this.listaVacia = true;
    this.nuevaCantidad = 0;
    this.total = 0;
    this.pago = 0;
    this.cambio = 0;

    //CONVERSION DE STRING A OBJETO EN CASO DE QUE ESTE GUARDADO EN LOCALSTORAGE
    var string = localStorage.getItem('carrito');
    if (string) {
      //console.log(string);
      this.productos = JSON.parse(string);
      for (var i = 0; i < this.productos.length; i++)
        this.total += this.productos[i].precioVenta * this.productos[i].cantidad;
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
    if (this.productos.length > 0)
      this.listaVacia = false;
  } 

  //AGREGAR PRODUCTOS Y CANTIDAD AL CARRITO
  pushProducto()//(producto,cantidad)
  {
    //VERIFICAR CANTIDAD VALIDA
    this.verificarCantidad();

    this.productos.push(this.producto);

    this.producto = new Producto('', '', '', 0, 0, 0, null);

    this.existeProducto = false;

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

  removerSeleccion() {
    //OBTENER TABLA
    var table = <HTMLTableElement>document.getElementById("carrito");

    var tmp = new Array<Producto>();
    //VERIFICAR TOTAL DE RENGLONES A ELIMINAR
    let totalSeleccion = 0;
    for (var i = 1; i < table.rows.length; i++) {
      let checkbox = <HTMLInputElement>table.rows[i].cells[0].firstElementChild;
      if (!checkbox.checked)
        tmp.push(this.productos[i - 1]);
    }

    this.productos = tmp;

    console.log('TOTAL_SEL:' + totalSeleccion);

    /*DEPRACATED
    //ELIMINAR RENGLONES SELECCIONADOS
    let totalEliminados = 0;
    while (totalEliminados < totalSeleccion) {

      let indexCheck = 0;//parseInt(checkbox.getAttribute('id'));
      let isChecked = false;

      for (var i = 1; i < table.rows.length; i++) {
        let checkbox = <HTMLInputElement>table.rows[i].cells[0].firstElementChild;
        //OBTENER INDEX
        console.log('INDEX: ' + indexCheck);
        //SI ES TRUE SE ELIMINA
        if (checkbox.checked) {
          indexCheck = i;
          isChecked = true;
          break;
        }
      }

      if(isChecked)
      {
        this.removeProducto(i-1);
        totalEliminados++;
        isChecked = false;
      }*/

    /*DEPRECATED
    //VERIFICAR CHECK EN CADA RENGLON  
    for (var i = 1; i < table.rows.length; i++) {
      let checkbox = <HTMLInputElement>table.rows[i].cells[0].firstElementChild;
      //OBTENER INDEX
      let indexCheck = i;//parseInt(checkbox.getAttribute('id'));
      console.log('INDEX: ' + indexCheck);
      //SI ES TRUE SE ELIMINA
      if (checkbox.checked) {
        this.productos.splice(indexCheck, 1);
        totalEliminados++;
        console.log('TOTAL_ELIMINADOS: '+totalEliminados);
        //checkbox.checked = false;
        break;
      }

    }
  }*/

    this.guardarCambios();
  }

  modificarCantidad(i) {
    this.index = i;
    this.editando = true;
  }

  guardarCantidadModificada() {

    console.log('CODIGO_BARRAS-> ' + this.productos[this.index].codigoBarras);
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
      this.total += this.productos[i].precioVenta * this.productos[i].cantidad;
    //BORRAR MENSAJE DE ERROR
    this.mostrandoError = false;
    this.errMsg = '';

    //VERIFICAR LISTA
    if (this.productos.length > 0)
      this.listaVacia = false;
    else
      this.listaVacia = true;

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
    //REGISTRO DE VENTA
    let datos = [];
    for (var i = 0; i < this.productos.length; i++) {
      let dato = { "c_barras": this.productos[i].codigoBarras, "cantidad": this.productos[i].cantidad };
      datos.push(dato);
    }
    console.log('JSON->' + JSON.stringify(datos));

    this._servicioVentas.agregarVenta(datos).subscribe(
      result => {
        console.log(result);
      }, error => {
        var error = <any>error;
        console.log(error);
      }
    );


    //REINICIACION DE VALORES
    this.productos = new Array();
    localStorage.clear();
    this.total = 0;
    this.pago = 0;
    this.cambio = 0;
    this.cantidadCorrecta = false;
    this.producto = new Producto('', '', '', 0, 0, 0, null);
    this.mostrandoError = false;
    this.errMsg = '';
    this.listaVacia = true;
    this.cerrar();

    /*DEPRECATED
    console.log('se ha enviado');
    this.carrito = [];
    localStorage.clear();
    this.total = 0;
    this.producto = new Producto('', '', '', 0, 0, 0, null);
    //this._router.navigate(['/']);
    */

    //AGREGAR IMPRESION DE TICKET
  }

  buscarProducto() {

    //VERIFICAR CANTIDAD VALIDA PARA MOSTRAR BOTON
    this.verificarCantidad();

    //VUELVE CAMBIO A 0 DESPUES DE HACER VENTA
    if (this.productos.length == 0)
      this.cambio = 0;

    //EVITA DUPLLICAR PRODUCTO
    if (this.productos.length > 0) {
      for (var i = 0; i < this.productos.length; i++)
        if (this.productos[i].codigoBarras != this.producto.codigoBarras) {
          this._servicioVentas.getProducto({ 'c_barras': this.producto.codigoBarras }).subscribe(
            result => {
              console.log(result);
              this.producto.nombre = result.nombre;
              this.producto.descripcion = result.descripcion;
              this.producto.precioVenta = result.precioVenta;
              this.producto.precioCompra = result.precioCompra;
              this.producto.categoria = result.categoria;
              this.existeProducto = true;
              this.cantidadExistente = result.cantidad;
            }, error => {
              var error = <any>error;
              this.mostrandoError = true;
              this.errMsg = 'Producto no encontrado';
              this.existeProducto = false;
              console.log(error);
            }
          );
        }
        //MENSAJE DE ERROR
        else {
          this.mostrandoError = true;
          this.errMsg = 'Producto duplicado';
          this.mostrandoError = true;
          this.existeProducto = false;
        }
    }
    else {
      //BUSCA PRODUCTO PRO PRIMERA VEZ
      this._servicioVentas.getProducto({ 'c_barras': this.producto.codigoBarras }).subscribe(
        result => {
          console.log(result);
          this.producto.nombre = result.nombre;
          this.producto.descripcion = result.descripcion;
          this.producto.precioVenta = result.precioVenta;
          this.producto.precioCompra = result.precioCompra;
          this.producto.categoria = result.categoria;
          this.existeProducto = true;
          console.log("CANTIDAD EXISTENTE->" + result.cantidad);
          this.cantidadExistente = result.cantidad;
        }, error => {
          var error = <any>error;
          this.errMsg = 'Producto no encontrado';
          this.mostrandoError = true;
          this.existeProducto = false;
          console.log(error);
        }
      );

    }

    if (this.cantidadExistente <= 0) {
      this.errMsg = 'Se agotó producto';
      this.mostrandoError = true;
    }
  }

  //VERIFICAR CANTIDADES CORRECTAS
  verificarCantidad() {
    if (this.producto.cantidad > 0 && this.producto.cantidad <= this.cantidadExistente)
      this.cantidadCorrecta = true;
    else //{
      this.cantidadCorrecta = false;
    /*
    if (this.producto.cantidad < 0)
      this.producto.cantidad = 0;
    else if (this.producto.cantidad >= this.cantidadExistente)
      this.producto.cantidad = this.cantidadExistente;
      */
    //}


  }

  onKey(event: any) {
    //ELIMINAR LETRAS Y CARACTERES
    let length = this.producto.codigoBarras.length;
    let lastChar = this.producto.codigoBarras.charAt(length - 1);
    //console.log('LEN: '+length);
    if (!(lastChar >= '0' && lastChar <= '9'))
      this.producto.codigoBarras = this.producto.codigoBarras.substring(0, length - 2);

    if (this.producto.codigoBarras.length >= 13) {
      //console.log(this.producto.codigoBarras.substring(0, 13));
      this.producto.codigoBarras = this.producto.codigoBarras.substring(0, 13);
      let codPattern = new RegExp('[0-9]');
      if (codPattern.test(this.producto.codigoBarras)) {
        this.buscarProducto();
      }
      else {
        this.mostrandoError = true;
        this.errMsg = 'Introducir dígitos del 0 al 9';
      }
      //console.log('It is ok');
    }
  }

  realizarPago() {
    this.cambio = this.pago - this.total;
    this.cambio = Number(this.cambio.toFixed(2));
    if (this.cambio < 0) {
      this.cambio = 0;
      this.ventaValida = false;
    }

    else
      this.ventaValida = true;
  }

  //MODALES
  cancelarModal() {
    //alert("CANCELAR?");
    $('#modalCancel').modal('show');
  }
  cerrar() {
    $('#modalCancel').modal('hide');
    $('#exampleModal').modal('hide');
  }

  //CANCELA LA VENTA
  cancelarVenta() {
    this.ventaValida = false;
    //REINICIACION DE VALORES
    this.productos = new Array();
    localStorage.clear();
    this.total = 0;
    this.pago = 0;
    this.cambio = 0;
    this.cantidadCorrecta = false;
    this.producto = new Producto('', '', '', 0, 0, 0, null);
    this.mostrandoError = false;
    this.errMsg = '';
    this.listaVacia = true;
    this.cerrar();
  }

}
