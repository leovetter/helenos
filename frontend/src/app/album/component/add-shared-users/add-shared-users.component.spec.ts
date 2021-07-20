import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddSharedUsersComponent } from './popup-add-shared-users.component';

describe('PopupAddSharedUsersComponent', () => {
  let component: PopupAddSharedUsersComponent;
  let fixture: ComponentFixture<PopupAddSharedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAddSharedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddSharedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
