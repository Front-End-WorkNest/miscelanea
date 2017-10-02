//MODULOS CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*DESCOMENTAR EN CASO DE SER NECESARIO
import { FormsModule } from '@angular/forms';
*/

//MODULO PETICIONES HTTP
import { HttpModule } from '@angular/http';
//MODULO DE ROUTING 
import { InventarioRouting} from './inventario.routing';

//AGREGAR COMPONENTES DEL MODULO...
import { TestComponent } from './components/test/test.component';

//GUARD 
import {InventarioGuard} from '../services/inventario.guard';

@NgModule(
    {
        declarations:[
            //AGREGAR COMPONENTES DEL MODULO    
            TestComponent        
        ],
        imports:[
            CommonModule,
            //FormsModule,
            HttpModule,
            InventarioRouting
        ],
        exports:[

        ],
        providers:[InventarioGuard]
    }
)

export class InventarioModule
{

}
