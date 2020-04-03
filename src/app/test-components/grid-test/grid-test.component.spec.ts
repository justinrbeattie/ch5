import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTestComponent } from './grid-test.component';

describe('GridTestComponent', () => {
  let component: GridTestComponent;
  let fixture: ComponentFixture<GridTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
