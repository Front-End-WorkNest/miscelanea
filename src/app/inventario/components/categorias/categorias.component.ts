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
  constructor(
    private _categoriasService: CategoriasService
  ) {
    this.categoria = new Categoria(0 , '', '');
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

}
