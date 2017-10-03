//MODULOS CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//MODULO PARA FORMS
import { FormsModule } from '@angular/forms';


//MODULO PETICIONES HTTP
import { HttpModule } from '@angular/http';
//MODULO DE ROUTING 
import { VentasRouting} from './ventas.routing';

//AGREGAR COMPONENTES DEL MODULO...
import { MainVentasComponent } from './components/main-ventas/main-ventas.component';
import { CarritoComponent } from './components/carrito/carrito.component';

//GUARD 
import {VentasGuard} from '../services/ventas.guard';


@NgModule(
    {
        declarations:[
            //AGREGAR COMPONENTES DEL MODULO   
            MainVentasComponent,
            CarritoComponent
            
        ],
        imports:[
            CommonModule,
            FormsModule,
            HttpModule,
            VentasRouting
        ],
        exports:[

        ],
        providers:[VentasGuard]
    }
)

export class VentasModule
{

}
