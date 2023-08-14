import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameSessionComponent } from './page-game-session.component';

describe('PageGameSessionComponent', () => {
  let component: PageGameSessionComponent;
  let fixture: ComponentFixture<PageGameSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGameSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGameSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
