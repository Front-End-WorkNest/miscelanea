import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';

// COMPONENTES
import { AppComponent } from './app.component';
import { ProductoModalComponent } from './modales/productos.modalcomponent';

// MODULO INVENTARIO
import { InventarioModule } from './inventario/inventario.module';
import {VentasModule} from './ventas/ventas.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoModalComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    InventarioModule,
    routing,
    FormsModule,
    VentasModule

  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
