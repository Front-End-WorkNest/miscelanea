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
      agregarVenta(ventaa) {
        const params = JSON.stringify(ventaa);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url + 'ventaaaaaa/iiiiiiinsertar/', params, {headers: headers})
                         .map(res => res.json());
      }
      getVenta() {
        return this._http.get(this.url + 'ventaaa/leer')
                         .map((res: Response) => res.json());
      
      }

      getCantidad(codigoo){
        const params = JSON.stringify(codigoo);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url + 'ventaaaaaa/cantidaaad/', params, {headers: headers})
                         .map(res => res.json());
      }
      

}