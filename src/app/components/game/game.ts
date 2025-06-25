import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Cell } from '../cell/cell';
import {GameService} from '../../services/game';

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
  //змінна для визначення гри

  constructor(public gameService: GameService) {

  }
  startGameWithBot(){
    this.gameService.vsBot = true;
    this.gameService.startGame()
  }
  startGameWithHuman() {
    this.gameService.vsBot = false;
    this.gameService.startGame()
  }
  restartGame() {
    this.gameService.resetGame()
  }


}

