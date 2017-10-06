import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Categoria } from '../models/categoria';

@Injectable()
export class ProductoService {
    public url: string;
    data: any = null;
    identity;
    token;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
      agregarProductos(productoo) {
        const params = JSON.stringify(productoo);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post('http://192.168.0.29:8080/producto/insertar', params, {headers: headers})
                         .map(res => res.json());
      }
      getProductos() {
        return this._http.get(this.url + 'producto/leer')
                         .map((res: Response) => res.json());
      }

      modificarProducto(productoo, cate) {
        /*if (productoo.categoria !== cate) {
            productoo.categoria = cate;
        }*/
        const params = JSON.stringify(productoo);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put('http://192.168.0.29:8080/producto/modificar',params,{headers:headers})
          .map((res:Response) => res.json());
      }

      eliminarProducto(productoo){
        const params = JSON.stringify(productoo);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.delete(this.url+'producto/eliminar/'+productoo,{headers:headers})
          .map((res:Response) => res.json());
      }

}
