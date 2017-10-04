// Importacion de los componentes necesarios para los metodos

import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriasService } from '../../../services/categorias.service';

// Declaracion de variables de Jquery para un metodo en especifico para el modal

declare var $: any;
declare var Jquery: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  providers: [CategoriasService]
})
export class CategoriasComponent implements OnInit {

  // Declaracion de las variables necesarias para los metodos que traen los datos de la BD y codigos de status

  public categoria: Categoria;
  public categorias: Categoria[];
  public status: string;
  public categoriaSeleccionada: Categoria;
  public indexclone: number;
  public categoriamodificada: Categoria;
  constructor(
    private _categoriasService: CategoriasService
  ) {
    this.categoria = new Categoria(0 , '', '');
    this.categoriaSeleccionada = new Categoria(0 , '', '');
    this.categorias = new Array();
  }

  // Metodo inicial del componente, trae los datos de la BD

  ngOnInit() {
    this._categoriasService.getCategorias().subscribe(
      result => {
        console.log('Categorias cargadas');
        this.categorias = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log(error);
      }
    );
  }

   // Metodo que al recargar el componente, trae de nuevo los datos de la BD

  refresh() {
    console.log('Refresh');
    this._categoriasService.getCategorias().subscribe(
      result => {
        console.log('Productos cargados');
        this.categorias = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log(error);
      }
    );
  }

   // Metodo que envia los datos a la BD, al existir un error, envia un mensaje a la consola de error con el estatus indicado,
   // Al tener exito muestra el estado success y oculta el modal del componente.

  onSubmit() {
    console.log('Entro');
    this._categoriasService.agregarCategoria(this.categoria).subscribe(
      result => {
        this.categoria = result;
        this.status = 'success';
        this.categorias.push(this.categoria);
        this.categoria = new Categoria(0 , '', '');
        console.log(JSON.stringify(result));
        $('#exampleModalC').modal('hide');
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        console.log('Ha ocurrido un error!');
      }
    );
  }

  asignarCat(i)  {
    this.categoriaSeleccionada = new Categoria(0 , '', '');
    this.categoriamodificada = this.categorias[i];
    this.categoriaSeleccionada = this.simpleClone(this.categorias[i]);
    this.indexclone = i;
  }
  onSubmitMod() {
    alert(JSON.stringify(this.categoriaSeleccionada));
  }
  simpleClone(obj: any) {
    return Object.assign({}, obj);
}
onClear() {
  $('#exampleModalC').on('hidden.bs.modal', function () {
    $('.modal-body').find('textarea,input').val('');
});
}
/**FUNCIÓN PARA MODIFICAR EL PRODUCTO DE LA TABLA: SERVICIO: modificarProducto */
modificar() {
  console.log(this.categoriaSeleccionada);
  this._categoriasService.modificarCategoria(this.categoriaSeleccionada).subscribe(
    result => {
      console.log('Categoria Modificado con éxito!');
      this.status = 'success2';
      this.categorias = result;
      console.log(JSON.stringify(result));
      this.categorias = null;
      this._categoriasService.getCategorias().subscribe(
        result2 => {
          console.log('Categorias cargadas');
          this.categorias = result2;
          console.log(JSON.stringify(result2));
        },
        error => {
          console.log(error);
        }
      );
    },
    error => {
      console.log('error');
      console.log(error);
    }
  );
}

closeAllModals() {
  $('#AceptarModificar, #exampleModalCModificar, #AceptarBorrar').modal('hide');
}

eliminar() {

  console.log('eliminando');
  this._categoriasService.eliminarCategoria(this.categoriaSeleccionada.id).subscribe(
    result => {
      console.log('Categoria Eliminada con éxito!');
      this.status = 'success3';
      this.categorias = result;
      console.log(JSON.stringify(result));
      this.categorias = null;
      this._categoriasService.getCategorias().subscribe(
        result2 => {
          console.log('Categorias cargadas');
          this.categorias = result2;
          console.log(JSON.stringify(result2));
        },
        error2 => {
          console.log(error2);
        }
      );
    },
    error3 => {
      if (error3.status && error3.status === 500) {
        this.status = 'success3';
      }else {
        console.log('Categoria Eliminada con éxito!');
        this.status = 'success4';
        this.categorias = null;
        this._categoriasService.getCategorias().subscribe(
          result2 => {
            console.log('Categorias cargadas');
            this.categorias = result2;
            console.log(JSON.stringify(result2));
          },
          error2 => {
            console.log(error2);
          }
        );
      }
    }
  );

}

}
