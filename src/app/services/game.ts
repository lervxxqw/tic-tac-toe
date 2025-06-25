import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  isPlay = false
  currentPlayer: 'X' | 'O' = 'X'
  winner: string | null = null;
  cells = Array(9).fill(null);
  vsBot = true; // вмикає режим гри проти комп’ютера
  constructor() {
  }

  startGame() {
    this.resetGame();
    this.isPlay = true;
    if (this.vsBot && this.currentPlayer === 'X') {
      setTimeout(() => this.makeBotMove(), 300);
    }
  }
  private checkWinnerPure(board: string[]): string | null {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  private checkWinner(board: string[]): string | null {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // Визначити тип перемоги
        const winType = this.getWinType(a, b, c);
        if (winType) {
          this.drawWinLine(winType.type, winType.index);
        }

        return board[a];
      }
    }

    return null;
  }

  makeMove(index: any) {
    if (this.winner) {
      return
    }
    this.cells[index] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.winner = this.checkWinner(this.cells);
    console.log(this.winner);

    // Якщо наступний хід — комп'ютера
    if (this.vsBot && this.currentPlayer === 'X') {
      setTimeout(() => this.makeBotMove(), 300);
    }
  }

  resetGame() {
    this.cells = Array(9).fill(null);
    this.winner = null;
    this.currentPlayer = 'X';
    this.isPlay = false;
  }

  drawWinLine(type: 'row' | 'col' | 'diag', index: number) {
    const line = document.querySelector('.win-line') as HTMLElement;
    if (!line) return;

    line.style.transform = 'none'; // reset
    line.style.height = '4px';
    line.style.width = '375px';
    line.style.top = '0';
    line.style.left = '0';
    line.style.transformOrigin = 'left center';
    line.style.transform = 'scaleX(0)'; // reset

    switch (type) {
      case 'row':
        line.style.top = `${index * 125 + 62.5}px`; // центр рядка
        line.style.left = '0';
        line.style.transform = 'scaleX(1)';
        line.style.transformOrigin = 'left center';
        break;

      case 'col':
        line.style.width = '4px';
        line.style.height = '375px';
        line.style.left = `${index * 125 + 62.5}px`; // центр колонки
        line.style.top = '0';
        line.style.transform = 'scaleY(1)';
        line.style.transformOrigin = 'top center';
        break;

      case 'diag':
        line.style.top = '187.5px'; // центр діагоналі
        line.style.left = '0';
        line.style.width = '375px';
        if (index === 0) {
          line.style.transform = 'rotate(45deg) scaleX(1)';
        } else {
          line.style.transform = 'rotate(-45deg) scaleX(1)';
        }
        line.style.transformOrigin = 'center center';
        break;
    }
  }

  private getWinType(a: number, b: number, c: number): { type: 'row' | 'col' | 'diag', index: number } | null {
    const rows = [
      [0, 1, 2], // row 0
      [3, 4, 5], // row 1
      [6, 7, 8], // row 2
    ];

    const cols = [
      [0, 3, 6], // col 0
      [1, 4, 7], // col 1
      [2, 5, 8], // col 2
    ];

    const diags = [
      [0, 4, 8], // diag 0
      [2, 4, 6], // diag 1
    ];

    for (let i = 0; i < rows.length; i++) {
      if (a === rows[i][0] && b === rows[i][1] && c === rows[i][2]) {
        return {type: 'row', index: i};
      }
    }

    for (let i = 0; i < cols.length; i++) {
      if (a === cols[i][0] && b === cols[i][1] && c === cols[i][2]) {
        return {type: 'col', index: i};
      }
    }

    for (let i = 0; i < diags.length; i++) {
      if (a === diags[i][0] && b === diags[i][1] && c === diags[i][2]) {
        return {type: 'diag', index: i};
      }
    }

    return null;
  }

  private makeBotMove() {
    if (this.winner) return;

    const board = [...this.cells];
    const bot = this.currentPlayer;
    const human = bot === 'X' ? 'O' : 'X';

    // 1. Спроба виграти прямо зараз
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = bot;
        if (this.checkWinnerPure(board)) {
          this.makeMove(i);
          return;
        }
        board[i] = null;
      }
    }

    // 2. Блокування перемоги гравця
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = human;
        if (this.checkWinnerPure(board)) {
          this.makeMove(i);
          return;
        }
        board[i] = null;
      }
    }

    // 3. Центр
    if (!board[4]) {
      this.makeMove(4);
      return;
    }

    // 4. Кути
    const corners = [0, 2, 6, 8];
    for (const i of corners) {
      if (!board[i]) {
        this.makeMove(i);
        return;
      }
    }

    // 5. Будь-яка інша клітинка
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        this.makeMove(i);
        return;
      }
    }
  }
}
