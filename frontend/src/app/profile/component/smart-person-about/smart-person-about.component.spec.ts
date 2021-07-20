import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPersonAboutComponent } from './smart-person-about.component';

describe('SmartPersonAboutComponent', () => {
  let component: SmartPersonAboutComponent;
  let fixture: ComponentFixture<SmartPersonAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartPersonAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartPersonAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
