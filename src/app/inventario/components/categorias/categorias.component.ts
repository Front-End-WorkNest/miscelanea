import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  providers: [CategoriasService]
})
export class CategoriasComponent implements OnInit {

  public categoria: Categoria;
  public categorias: Categoria[];
  constructor(
    private _categoriasService: CategoriasService
  ) {
    this.categoria = new Categoria(0 , '', '');
    this.categorias = new Array();
  }

  ngOnInit() {
    this._categoriasService.getCategorias().subscribe(
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

  onSubmit() {
    console.log('Entro');
    this._categoriasService.agregarCategoria(this.categoria).subscribe(
      result => {
        this.categoria = result;
        console.log(JSON.stringify(result));
      },
      error => {
        console.log(error);
      }
    );
  }

}
