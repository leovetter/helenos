import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCommentsComponent } from './media-comments.component';

describe('MediaCommentsComponent', () => {
  let component: MediaCommentsComponent;
  let fixture: ComponentFixture<MediaCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
