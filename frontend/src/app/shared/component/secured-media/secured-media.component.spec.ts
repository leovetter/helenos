import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredMediaComponent } from './secured-media.component';

describe('SecuredMediaComponent', () => {
  let component: SecuredMediaComponent;
  let fixture: ComponentFixture<SecuredMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuredMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuredMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
