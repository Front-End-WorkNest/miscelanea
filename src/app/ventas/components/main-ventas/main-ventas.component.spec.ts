import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVentasComponent } from './main-ventas.component';

describe('MainVentasComponent', () => {
  let component: MainVentasComponent;
  let fixture: ComponentFixture<MainVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
