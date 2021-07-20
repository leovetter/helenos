import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartResultsComponent } from './smart-results.component';

describe('SmartResultsComponent', () => {
  let component: SmartResultsComponent;
  let fixture: ComponentFixture<SmartResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
