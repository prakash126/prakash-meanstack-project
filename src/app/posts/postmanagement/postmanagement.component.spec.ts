import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmanagementComponent } from './postmanagement.component';

describe('PostmanagementComponent', () => {
  let component: PostmanagementComponent;
  let fixture: ComponentFixture<PostmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
