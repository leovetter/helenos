import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartAboutComponent } from './smart-about.component';

describe('SmartAboutComponent', () => {
  let component: SmartAboutComponent;
  let fixture: ComponentFixture<SmartAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
