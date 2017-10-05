import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Producto } from "../../../models/producto"; // Importamos el modelo de productos
import { ProductoService } from "../../../services/productos.service";
import { CategoriasService } from "../../../services/categorias.service"; // Importamos el servicio de productos.

import { Categoria } from "../../../models/categoria";

// Declaracion de variables de Jquery para un metodo en especifico para el modal
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"],
  providers: [ProductoService, CategoriasService]
})
export class ProductosComponent implements OnInit {
  public title1: string;
  public title2: string;
  //public status: string;
  //public statusM: string;
  public s:string;
  public idModificar: string;
  public cate: string;

  // Declaracion de las variables necesarias para los metodos que traen los datos de la BD y codigos de status
  public producto: Producto; // Instanciamos el objeto de Models
  public productos; // Instanciamos el objeto de Models
  public productoSeleccionado;

  public categoria: Categoria;
  public categorias: Categoria[];

  constructor(
    private _productosService: ProductoService /**Necesitamos el servicio */,
    private _categoriaService: CategoriasService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title1 = "Agregar Producto";
    this.title2 = "Editar Producto";
    this.categoria = new Categoria(0, "", "");
    this.producto = new Producto("", "", "", 0, 0, 0, "");
    this.categorias = new Array();
    //Definimos la propiedad a modificar de productos y definimos el Array
    this.productoSeleccionado = new Producto("", "", "", 0, 0, 0, "");
    this.productos = new Array();
  }

  ngOnInit() {
    this._productosService.getProductos().subscribe(
      result => {
        console.log("Productos cargados");
        this.productos = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log(error);
      }
    );
    this._categoriaService.getCategorias().subscribe(
      result => {
        console.log("Categorias cargados");
        this.categorias = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log(error);
      }
    );
    $("#exampleModalP").on("hidden.bs.modal", e => {
      $(".modal-body")
        .find("textarea,input")
        .val("");
      $("#exampleFormControlSelect1").prop("selectedIndex", 0);
      /**ELIMINAR LOS MENSAJES DE ERROR AL CERRAR MODAL */
      this.producto = new Producto("", "", "", 0, 0, 0, "");
      this.productoSeleccionado = new Producto("", "", "", 0, 0, 0, "");
      var mensajes = document.getElementsByClassName("err");
      for (var i = 0; i < mensajes.length; i++) {
        mensajes[i].innerHTML = "";
      }
    });
  }

  refresh() {
    console.log("Refresh");
    this._productosService.getProductos().subscribe(
      result => {
        console.log("Productos cargados");
        this.productos = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log("error");
        console.log(error);
      }
    );
  }

  onSubmit() {
    
    //console.log("El arreglo de productos enviados es: ");
    //console.log(JSON.stringify(this.producto));

    //this.productos.push(this.producto);
    //console.log(this.productos);

    //ESTO ENVIÁ LOS ADTOS DEL FORMULARIO AL SERVIDOR Y EVALUA SI ESTE LO HA RECIBIDO O NO
    this._productosService.agregarProductos(this.producto).subscribe(
      response => {
        console.log("ELEMENTOS A GUARDAR.....");
        console.log(JSON.stringify(response));
        //if(response.codigoBarras==this.productos[1])

        //console.log("PRODUCTO REPETIDO MEN!");

        //else{
        console.log("Guardando EN TABLA DE MANERA LOCAL...");
        console.log(JSON.stringify(response));
        //this.productosform = response; //Agrega productos a la tabla
        this.s = "bien";
        //Almacena productos
        this.productos.push(this.producto);
        console.log(this.productos);
        /**Cerramos el modal despúes de que se insertó correctamente... */
        $("#exampleModalP").modal("hide");
        this.productos = null;
        this._productosService.getProductos().subscribe(
          result2 => {
            console.log("Productos cargados");
            this.productos = result2;
            console.log(JSON.stringify(result2));
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(<any>error);
        this.s = "error";
        console.log("Ha ocurrido un error!");
      }
    );
  }
  asignarCat(i) {
    //this.productoSeleccionado = new Categoria(0 , '', '');
    this.productoSeleccionado = this.simpleClone(this.productos[i]);
    console.log('htyrrrye' +this.productoSeleccionado);
  }
  onSubmitMod() {
    alert(JSON.stringify(this.productoSeleccionado));
  }
  simpleClone(obj: any) {
    return Object.assign({}, obj);
  }
  /**FUNCIÓN PARA MODIFICAR EL PRODUCTO DE LA TABLA: SERVICIO: modificarProducto */
  modificar() {
    //console.log("Producto a modificar: " + this.productoSeleccionado);
    this._productosService
      .modificarProducto(this.productoSeleccionado)
      .subscribe(
        result => {
          this.s = "successM";
          console.log("Producto Modificado con éxito!");
          this.productos = result;
          console.log(JSON.stringify(result));
          this.productos = null;
          this._productosService.getProductos().subscribe(
            result2 => {
              console.log("Productos cargados");
              this.productos = result2;
              console.log(JSON.stringify(result2));
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          this.s = "error";
          console.log("No se modificó el producto!");
          console.log(error);
        }
      );
  }
  /**TERMINA FUNCIÓN MODIFICAR */
  /**FUNCIÓN ELIMINAR PRODUCTO */
  eliminar() {
    //console.log("Producto a eliminar:" + this.productoSeleccionado);
    //console.log("categoria"+this.productoSeleccionado.codigoBarras);
    this._productosService.eliminarProducto(this.productoSeleccionado.codigoBarras).subscribe(
        result => {
          
          alert("Producto eliminado con éxito!");
          
          // console.log(JSON.stringify(result));
          /**REINICIAMOS LAS PETICIONES AL SERVIDOR */
          
        },
        error => {
          console.log(error);
          this.s = 'eliminado';
          
          this.productos = null;
          this._productosService.getProductos().subscribe(
            result2 => {
              this.s = 'eliminado';
              console.log("Productos cargados....");
              this.productos = result2;
              console.log(JSON.stringify(result2));
            },
            error2 => {
              console.log(error2);
              alert("1");
            }
          );
        }
        
      );
  }
  /**TERMINA FUNCIÓN ELIMINAR PRODUCTO */
  /**Función para sacar el ID  de producto*/
  guardarValor(idModificar) {
    this.idModificar = idModificar;
  }

  obtenerIdCategoria() {
    for (let cat of this.categorias) {
      if (cat.nombre === this.cate) {
        this.productoSeleccionado.categoria = cat.id;
        alert(JSON.stringify(this.productoSeleccionado));
        //console.log("holi");
        console.log(cat.id);

        console.log(this.productoSeleccionado);
      } else {
      }
    }
  }
  onClear() {
    console.log("RESET");
    //$("#exampleModalP").reset();
    
    $("#exampleModalP").on("hidden.bs.modal", e => {
      $(".modal-body")
        .find("textarea,input")
        .val("");
      $("#exampleFormControlSelect1").prop("selectedIndex", 0);
      /**ELIMINAR LOS MENSAJES DE ERROR AL CERRAR MODAL */
      this.producto = new Producto("", "", "", 0, 0, 0, "");

      var mensajes = document.getElementsByClassName("err");
      for (var i = 0; i < mensajes.length; i++) {
        mensajes[i].innerHTML = "";
      }
      window.location.reload();
    });

  }
  /**Volver a posicionar el select en 0 */
  Selectcero() {
    $("#exampleFormControlSelect1").prop("selectedIndex", 0);
    $("#exampleFormControlSelect2").prop("selectedIndex", 0);
  }

  cerrarModalConfirm() {
    $("#modalAceptUpPro").modal("hide");
    $("#modaleditPro").modal("hide");
    $("#AcepBorrarPro").modal("hide");
    
    //$('#modaleditPro').modal('hide');
  }
  AceptarUpdateProducto() {
    $("#modalAceptUpPro").modal("show");
  }
}
