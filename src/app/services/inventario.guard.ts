import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class InventarioGuard implements CanActivate {

    //VARIABLE DE GUARD [**CAMBIAR POR MODELO**]
    isProtected: boolean;

    constructor(
        private _router: Router
    ) 
    { 
        //POR DEFAULT ESTARA ACTIVADO EL GUARD
        this.isProtected = true;//false
    }

    //GUAR DE PRUEBA [**CAMBIAR POR COMPROBACION DE INICIO DE SESION**]
    canActivate() {
        if (this.isProtected)
            return true;
        else
        {
            this._router.navigate(['/']);
            return false;
        }
            
    }

}