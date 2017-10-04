import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Categoria } from '../models/categoria';

@Injectable()
export class VentasService {
    public url: string;
    data: any = null;
    identity;
    token;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
    //Codigo 200 exito
    //codigo 400 not found
    //codig 500 error interno (alguna de las razones puede ser por que se envia un dato incorrecto desde front)
      agregarVenta(ventaa) {
        const params = JSON.stringify(ventaa);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url + 'venta/registrar/', params, {headers: headers})
                         .map(res => res.json());
      }

      getProducto(codigoo){
        const params = JSON.stringify(codigoo);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url + 'producto/buscar/', params, {headers: headers})
                         .map(res => res.json());
      }
      

}