import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/productos.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [ProductoService]
})
export class TestComponent implements OnInit {

  public producto: Producto;
  public productos: Producto[];
  constructor(
    private _productosService: ProductoService
  ) {
    this.productos = new Array();
  }

  ngOnInit() {
  }

}
