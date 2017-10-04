import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

/**Declaración de las variables para JQUERY */
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'app';

  constructor(
    private _router: Router
  ) {
  }
  onSubmit(){
    alert("TODO BIEN");
  }
  cancelarModal(){
    //alert("CANCELAR?");
    $('#modalCancel').modal('show');
  }
  cerrar(){
    $('#modalCancel').modal('hide');
    $('#exampleModal').modal('hide');
  }
}
