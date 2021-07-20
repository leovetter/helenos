import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteMediaComponent } from './popup-delete-media.component';

describe('PopupDeleteMediaComponent', () => {
  let component: PopupDeleteMediaComponent;
  let fixture: ComponentFixture<PopupDeleteMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDeleteMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
