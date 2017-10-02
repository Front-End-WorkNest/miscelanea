import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//GUARD 
import { InventarioGuard } from '../services/inventario.guard';


//AGREGAR COMPONENTES DEL MODULO...
import { TestComponent } from './components/test/test.component';

const inventarioRoutes: Routes = [
    {
        //RUTA PRINCIPAL
        path: 'test', 
        component: TestComponent, 
        canActivate:[InventarioGuard],
        //SUBRUTAS
        children: [
           //{ path: 'otra_ruta':OtroComponente }
        ]
    }

    /*UNA SOLA RUTA
    {
        //PROTECCION DE RUTA
        canActivate: [InventarioGuard],
        //RUTA PRINCIPAL
        path: 'test', component:TestComponent,
    }
    */
];

@NgModule({
    imports:[
        RouterModule.forChild(inventarioRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class InventarioRouting
{

}