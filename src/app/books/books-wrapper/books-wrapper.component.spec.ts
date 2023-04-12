import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksWrapperComponent } from './books-wrapper.component';

describe('BooksWrapperComponent', () => {
  let component: BooksWrapperComponent;
  let fixture: ComponentFixture<BooksWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
