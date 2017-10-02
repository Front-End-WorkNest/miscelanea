// MODULOS CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*DESCOMENTAR EN CASO DE SER NECESARIO
import { FormsModule } from '@angular/forms';
*/

// MODULO PETICIONES HTTP
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// MODULO DE ROUTING
import { InventarioRouting} from './inventario.routing';

// AGREGAR COMPONENTES DEL MODULO...
import { TestComponent } from './components/test/test.component';

// GUARD
import {InventarioGuard} from '../services/inventario.guard';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ModalCategoriasComponent } from './components/modal-categorias/modal-categorias.component';
import { MainComponent } from './components/main/main.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ModalProductosComponent } from './components/modal-productos/modal-productos.component';

@NgModule(
    {
        declarations: [
            // AGREGAR COMPONENTES DEL MODULO
            TestComponent,
            CategoriasComponent,
            ModalCategoriasComponent,
            MainComponent,
            ModalProductoComponent,
            ProductosComponent,
            ModalProductosComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            HttpModule,
            InventarioRouting
        ],
        exports: [

        ],
        providers: [InventarioGuard]
    }
)

export class InventarioModule

{

}
