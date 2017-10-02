import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './productos/home.component'
import { AppComponent } from './app.component';
import { ProductoModalComponent } from './modales/productos.modalcomponent';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
