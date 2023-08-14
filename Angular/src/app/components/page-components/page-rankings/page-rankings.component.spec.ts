import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRankingsComponent } from './page-rankings.component';

describe('PageRankingsComponent', () => {
  let component: PageRankingsComponent;
  let fixture: ComponentFixture<PageRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRankingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
