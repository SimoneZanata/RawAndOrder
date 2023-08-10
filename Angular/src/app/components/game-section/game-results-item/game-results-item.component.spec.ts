import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsItemComponent } from './game-results-item.component';

describe('GameResultsItemComponent', () => {
  let component: GameResultsItemComponent;
  let fixture: ComponentFixture<GameResultsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameResultsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameResultsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
