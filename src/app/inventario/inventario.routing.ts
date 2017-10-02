import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// GUARD
import { InventarioGuard } from '../services/inventario.guard';


// AGREGAR COMPONENTES DEL MODULO...
import { TestComponent } from './components/test/test.component';
import { MainComponent } from './components/main/main.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

const inventarioRoutes: Routes = [
    {
        // RUTA PRINCIPAL
        path: 'inventario',
        component: MainComponent,
        canActivate: [InventarioGuard],
        // SUBRUTAS
        children: [
           { path: '', component: ProductosComponent },
           { path: 'productos', component: ProductosComponent },
           { path: 'categorias', component: ProductosComponent }
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