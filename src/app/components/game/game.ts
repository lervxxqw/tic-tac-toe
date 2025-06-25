import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Cell } from '../cell/cell';

@Component({
  selector: 'app-game',
  imports: [
    MatIcon,
    MatFabButton,
    Cell
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss',
  standalone: true
})
export class Game {
  currentPlayer: 'X' | 'O' = 'O'
  cells = Array(9).fill(null);
  //змінна для визначення гри
  isPlay = false

  startGame() {
    this.isPlay = true
  }

  makeMove(index: any) {
    this.cells[index] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

  }
}

