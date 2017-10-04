import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Producto } from '../../../models/producto'; // Importamos el modelo de productos
import { ProductoService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service'; // Importamos el servicio de productos.

import { Categoria } from '../../../models/categoria';

// Declaracion de variables de Jquery para un metodo en especifico para el modal
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService, CategoriasService]
})
export class ProductosComponent implements OnInit {
  public title1:string;
  public title2:string;
  public status: string;
  public idModificar:string;

   // Declaracion de las variables necesarias para los metodos que traen los datos de la BD y codigos de status
  public producto: Producto; // Instanciamos el objeto de Models
  public productos: Producto[]; // Instanciamos el objeto de Models
  public productoSeleccionado;

  public categoria: Categoria;
  public categorias: Categoria[];

  constructor(
    private _productosService: ProductoService, /**Necesitamos el servicio */
    private _categoriaService: CategoriasService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title1="Agregar Producto";
    this.title2="Editar Producto";
    this.categoria = new Categoria (0,"","");
    this.producto = new Producto ("", "", "", 0, 0, 0, "");
    this.categorias = new Array();
    //Definimos la propiedad a modificar de productos y definimos el Array
    this.productoSeleccionado = new Producto("", "", "", 0, 0, 0, "");
    this.productos = new Array();
  }
  ngOnInit() {
    
    this._productosService.getProductos().subscribe(
      result => {
        console.log('Productos cargados');
        this.productos = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log(error);
      }
    );
    this._categoriaService.getCategorias().subscribe(
      result => {
        console.log('Categorias cargados');
        this.categorias = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log(error);
      }
    );
  }

  refresh() {
    
    console.log('Refresh');
    this._productosService.getProductos().subscribe(
      result => {
        console.log('Productos cargados');
        this.productos = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log('error');
        console.log(error);
      }
    );
  }

  onSubmit(){
    //console.log("El arreglo de productos enviados es: ");
    //console.log(JSON.stringify(this.producto));
  
    //this.productos.push(this.producto);
    //console.log(this.productos);
      
//ESTO ENVIÁ LOS ADTOS DEL FORMULARIO AL SERVIDOR Y EVALUA SI ESTE LO HA RECIBIDO O NO
      this._productosService.agregarProductos(this.producto).subscribe(
          response => 
          {
            console.log("ELEMENTOS A GUARDAR.....");
            console.log(JSON.stringify(response));
            //if(response.codigoBarras==this.productos[1])
            
              //console.log("PRODUCTO REPETIDO MEN!");
            
              //else{
                console.log("Guardando EN TABLA DE MANERA LOCAL...");
                console.log(JSON.stringify(response));
                //this.productosform = response; //Agrega productos a la tabla
                this.status = 'bien';
                //Almacena productos
                this.productos.push(this.producto);
                console.log(this.productos);
                /**Cerramos el modal despúes de que se insertó correctamente... */
                $('#exampleModalP').modal('hide');
              
          },
          error => {
              console.log(<any>error);
              this.status = "error";
              console.log("Ha ocurrido un error!");
          }
      );
  }
  asignarCat(i)  {
    //this.productoSeleccionado = new Categoria(0 , '', '');
    this.productoSeleccionado = this.simpleClone(this.productos[i]);
  }
  onSubmitMod() {
    alert(JSON.stringify(this.productoSeleccionado));
  }
  simpleClone(obj: any) {
    return Object.assign({}, obj);
}
AceptarUpdateProducto()
{
  $('#modalAceptUpPro').modal('show');
}
cerrarModalConfirm(){
  $('#modalAceptUpPro').modal('hide');
  //$('#modaleditPro').modal('hide');
}
saluda()
{
  alert("Hola");
}
/**FUNCIÓN PARA MODIFICAR EL PRODUCTO DE LA TABLA: SERVICIO: modificarProducto */
modificar()
{
  console.log(this.productoSeleccionado);
  this._productosService.modificarProducto(this.productoSeleccionado).subscribe(
    result => {
      this.status = 'success';
      console.log('Producto Modificado con éxito!');
      this.productos = result;
      console.log(JSON.stringify(result));
      
    },
    error => {
      this.status = 'error';
      console.log('No se modificó el producto!');
      console.log(error);
    }
  );
}
/**Función para sacar el ID  de producto*/
guardarValor(idModificar)
{
  this.idModificar = idModificar;
}

obtenerIdCategoria(categoria: string) {
  console.log(categoria);
  for (let cat of this.categorias) {
      if(cat.nombre === categoria) {
          this.productoSeleccionado.categoria= cat.id;
          alert(JSON.stringify(this.productoSeleccionado));
      }
  }
}
onClear() {
  $('#exampleModalP').on('hidden.bs.modal', function () {
    $('.modal-body').find('textarea,input').val('');
});
}
}
