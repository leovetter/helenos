import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveSocialComponent } from './drive-social.component';

describe('DriveSocialComponent', () => {
  let component: DriveSocialComponent;
  let fixture: ComponentFixture<DriveSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
