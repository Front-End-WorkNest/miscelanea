import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriasComponent } from './modal-categorias.component';

describe('ModalCategoriasComponent', () => {
  let component: ModalCategoriasComponent;
  let fixture: ComponentFixture<ModalCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
