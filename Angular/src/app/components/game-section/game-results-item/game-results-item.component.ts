import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'tnv-game-results-item',
  templateUrl: './game-results-item.component.html',
  styleUrls: ['./game-results-item.component.scss']
})
export class GameResultsItemComponent {
  @Input() movie: Movie |undefined
  @Output()clicked = new EventEmitter<number>();

onClick(){
  this.clicked.emit(this.movie?.id)
}
}
