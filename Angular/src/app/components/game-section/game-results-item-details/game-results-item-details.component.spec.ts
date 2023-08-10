import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsItemDetailsComponent } from './game-results-item-details.component';

describe('GameResultsItemDetailsComponent', () => {
  let component: GameResultsItemDetailsComponent;
  let fixture: ComponentFixture<GameResultsItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameResultsItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameResultsItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
