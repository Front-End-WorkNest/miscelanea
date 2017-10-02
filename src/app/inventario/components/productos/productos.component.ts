import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Producto } from '../../../models/producto'; // Importamos el modelo de productos
import { ProductoService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service'; // Importamos el servicio de productos.

import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService, CategoriasService]
})
export class ProductosComponent implements OnInit {
  public producto: Producto; // Intanciamos el objeto de Models
  public productos: Producto[]; // Intanciamos el objeto de Models
  public categoria: Categoria;
  public status: string;
  public categorias: Categoria[];
  constructor(
    private _productosService: ProductoService, /**Necesitamos el servicio */
    private _categoriaService: CategoriasService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.categoria = new Categoria (0,"","");
    this.producto = new Producto ("", "", "", 0, 0, 0, this.categoria);
    this.categorias = new Array();
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
      console.log(this.producto);
      console.log("holaaaaa");


      this._productosService.agregarProductos(this.producto).subscribe(
          response => 
          {
            console.log(JSON.stringify(response));
          },
          error => {
              console.log(<any>error);
              this.status = "error";
              console.log("Ha ocurrido un error!");
          }
      );
  }
  getdatos(): string {
    return JSON.stringify(this.producto);
  }

 /* sacarCategoria(cat: string) {
      for (let categoria: Categoria in this.categorias) {
          if  (categoria.nombre === cat) {
              this.producto.categoria = categoria;
          }
      }
  }*/
}
