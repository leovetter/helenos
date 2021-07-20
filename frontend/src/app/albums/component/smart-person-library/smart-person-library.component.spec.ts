import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPersonLibraryComponent } from './smart-person-library.component';

describe('SmartPersonLibraryComponent', () => {
  let component: SmartPersonLibraryComponent;
  let fixture: ComponentFixture<SmartPersonLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartPersonLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartPersonLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
