import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';

//COMPONENTES
import { AppComponent } from './app.component';
import { ProductoModalComponent } from './modales/productos.modalcomponent';

//MODULO INVENTARIO
import { InventarioModule } from './inventario/inventario.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoModalComponent
  ],
  imports: [
    BrowserModule,
    InventarioModule,
    routing,
    //MODULO INVENTARIO
    InventarioModule

  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
