import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartProfilePersonComponent } from './smart-profile-person.component';

describe('SmartProfilePersonComponent', () => {
  let component: SmartProfilePersonComponent;
  let fixture: ComponentFixture<SmartProfilePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartProfilePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartProfilePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
