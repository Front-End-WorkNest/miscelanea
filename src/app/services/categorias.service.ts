import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Categoria } from '../models/categoria';

@Injectable()
export class CategoriasService {
    public url: string;
    data: any = null;
    identity;
    token;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    // codigo 200 ok
    // 404 erro

      agregarCategoria(categoriaa) {
        const params = JSON.stringify(categoriaa);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url + 'categoria/insertar/', params, {headers: headers})
                         .map(res => res.json());
      }
      getCategorias() {
        return this._http.get(this.url + 'categoria/leer/')
                         .map((res: Response) => res.json());
      }

      modificarCategoria(categoriaa) {
        const params = JSON.stringify(categoriaa);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'categoria/modificar', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      eliminarCategoria(categoriaa) {
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.delete('http://192.168.0.29:8080/categoria/eliminar/' + categoriaa, {headers: headers})
          .map((res: Response) => res.json());
      }
}
