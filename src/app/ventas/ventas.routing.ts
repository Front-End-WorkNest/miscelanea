import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// GUARD
import { VentasGuard } from '../services/ventas.guard';


// AGREGAR COMPONENTES DEL MODULO...
import { MainVentasComponent } from './components/main-ventas/main-ventas.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const ventasRoutes: Routes = [
    {
        // RUTA PRINCIPAL
        path: 'ventas',
        component: MainVentasComponent,
        canActivate: [VentasGuard],
        // SUBRUTAS
        children: [
           { path: '', redirectTo: 'carrito' , pathMatch: 'full' },
           { path: 'carrito', component: CarritoComponent }
        ]
    }

];

@NgModule({
    imports:[
        RouterModule.forChild(ventasRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class VentasRouting
{

}