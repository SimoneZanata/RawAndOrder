import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameResultsItemDetailsComponent } from './page-game-results-item-details.component';

describe('PageGameResultsItemDetailsComponent', () => {
  let component: PageGameResultsItemDetailsComponent;
  let fixture: ComponentFixture<PageGameResultsItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGameResultsItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGameResultsItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
