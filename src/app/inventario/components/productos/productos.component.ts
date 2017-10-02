import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  providers: [ProductoService]
})
export class ProductosComponent implements OnInit {

  public producto: Producto;
  public productos: Producto[];
  constructor(
    private _productosService: ProductoService
  ) {
    this.producto = new Producto('', '', '', 0, 0, 0, '');
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
        console.log(error);
      }
    );
  }

}
