import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteLibraryComponent } from './delete-album.component';

describe('PopupDeleteLibraryComponent', () => {
  let component: PopupDeleteLibraryComponent;
  let fixture: ComponentFixture<PopupDeleteLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDeleteLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
