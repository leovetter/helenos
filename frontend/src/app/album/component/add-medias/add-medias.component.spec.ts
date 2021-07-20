import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddMediasComponent } from './add-medias.component';

describe('PopupAddMediasComponent', () => {
  let component: PopupAddMediasComponent;
  let fixture: ComponentFixture<PopupAddMediasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAddMediasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
