import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.scss'
})
export class Cell {
  @Input() value: 'X' | 'O' | undefined;
  @Input() currentPlayer: 'X' | 'O' |  undefined;
  @Output() makeMove = new EventEmitter();

  onClick() {
   if(!this.value){
     this.makeMove.emit();
   }
  }
}
