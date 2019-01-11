const board = document.querySelector('.board');
const squares = board.children;
class Game {
    constructor() {
        this.turn = 'player1';
        this.marked = 0;
    }
    mark(cell) {
        const img = document.createElement('img');
        if (this.turn === 'player1') {
            img.src = 'images/x.png';
        }
        else {
            img.src = 'images/o.png'; 
        }
        cell.appendChild(img);
        this.marked++;
        cell.classList.remove(this.turn);
    }
    updateHover(prevTurn) {
        let i;
        for (i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains(prevTurn)) {
                squares[i].classList.remove(prevTurn);
                squares[i].classList.add(this.turn);
            }
        }
    }
    changeTurn() {
        let prevTurn = this.turn;
        if (this.turn === 'player1') {
            this.turn = 'player2';
        }
        else {
            this.turn = 'player1';
        }
        this.updateHover(prevTurn);
    }
    winning(seq) {
        const mark1 = seq[0].children[0];
        const mark2 = seq[1].children[0];
        const mark3 = seq[2].children[0];
        if (!mark1 || !mark2 || !mark3) {
            return false;
        }
        else {
            return mark1.src === mark2.src && mark2.src === mark3.src;
        }
    }
    endOfGame() {
      if (this.marked === 9) {
          return true;
      }
      let seq = [];
      let i;
      for (i = 0; i <= 6; i += 3) {
          seq.push(squares[i]);
          seq.push(squares[i + 1]);
          seq.push(squares[i + 2]);
          if (this.winning(seq)) {
              return true;
          }
          seq = [];
      }
      for (i = 0; i <= 2; i++) {
          seq.push(squares[i]);
          seq.push(squares[i + 3]);
          seq.push(squares[i + 6]);
          if (this.winning(seq)) {
              return true;
          }
          seq = [];
      }
      seq.push(squares[0]);
      seq.push(squares[4]);
      seq.push(squares[8]);
      if (this.winning(seq)) {
          return true;
      }
      seq = [];
      seq.push(squares[2]);
      seq.push(squares[4]);
      seq.push(squares[6]);
      if (this.winning(seq)) {
          return true;
      }
      return false;
    }
    updateBoard(cell) {
        this.mark(cell);
        if (!this.endOfGame()) {
            this.changeTurn();
        }
        else {
            setTimeout(() => this.reset(), 300);
        }
    }
    reset() {
        let i;
        for (i = 0; i < squares.length; i++) {
            squares[i].classList.remove(this.turn);
            squares[i].classList.add('player1');
            while (squares[i].firstChild) {
                squares[i].removeChild(squares[i].firstChild);
            }
        }
        this.turn = 'player1';
        this.marked = 0;
    }
}

const game = new Game();

board.addEventListener('click', e => {
    if (e.target.classList.contains('square') && !e.target.querySelector('img')) {
        game.updateBoard(e.target);
    }
});
