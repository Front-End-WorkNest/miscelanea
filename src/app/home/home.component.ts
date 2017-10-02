import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm } from '@angular/forms';
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
}
