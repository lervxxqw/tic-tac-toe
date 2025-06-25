import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameService} from '../../services/game';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.scss'
})
export class Cell {
  @Input() value: 'X' | 'O' | undefined;
  @Input() currentPlayer: 'X' | 'O' | undefined;
  @Output() makeMove = new EventEmitter();

  constructor(public gameService: GameService) {

  }

  onClick() {
    if (!this.value) {
      this.makeMove.emit();
    }
  }
}
