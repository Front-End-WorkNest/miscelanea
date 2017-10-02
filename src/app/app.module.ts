import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing, appRoutingProviders } from './app.routing';

//COMPONENTES
import { AppComponent } from './app.component';

//MODULO INVENTARIO
import { InventarioModule } from './inventario/inventario.module';

@NgModule({
  declarations: [
    AppComponent
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
