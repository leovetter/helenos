import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageContainerComponent } from './edit-image-container.component';

describe('EditImageContainerComponent', () => {
  let component: EditImageContainerComponent;
  let fixture: ComponentFixture<EditImageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
