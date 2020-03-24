import {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine,
  Direction
} from './ship';

// var require('./ship')

const MAX_ROW = 10;
const SHIPS = { 
  BATTLESHIP1: 'Battleship1',
  CRUISER1: 'Cruiser1',
  CRUISER2: 'Cruiser2',
  DESTROYER1: 'Destroyer1',
  DESTROYER2: 'Destroyer2',
  DESTROYER3: 'Destroyer3',
  SUBMARINE1: 'Submarine1',
  SUBMARINE2: 'Submarine2',
  SUBMARINE3: 'Submarine3',
  SUBMARINE4: 'Submarine4',
}
const convertLetterToNumber = (l) => l.codePointAt(0) - 65;
const range = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt);
const characterRange = (startChar, endChar) => String.fromCharCode(...range(endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1, startChar.charCodeAt(0)));

class Player {
  constructor(){
    this.board = [];
    for(let n of range(MAX_ROW)){
      if(!this.board[n])
        this.board[n] = [];
      for(let c in characterRange('A', 'J')){
        this.board[n][parseInt(c)] = ' ';
      }
    }
    this.ships = new Map();
    this.ships.set(SHIPS.BATTLESHIP1, new Battleship());
    this.ships.set(SHIPS.CRUISER1, new Cruiser());
    this.ships.set(SHIPS.CRUISER2, new Cruiser());
    this.ships.set(SHIPS.DESTROYER1, new Destroyer());
    this.ships.set(SHIPS.DESTROYER2, new Destroyer());
    this.ships.set(SHIPS.DESTROYER3, new Destroyer());
    this.ships.set(SHIPS.SUBMARINE1,new Submarine());
    this.ships.set(SHIPS.SUBMARINE2, new Submarine());
    this.ships.set(SHIPS.SUBMARINE3, new Submarine());
    this.ships.set(SHIPS.SUBMARINE4, new Submarine());
  }

  playment(name, {row, col}, direction ) {
    let ship = this.ships.get(name);
    if(ship.isPlace) {
      throw new TypeError('Already place it');
    }
    if(direction === Direction.HORIZONTAL){
      let length = col + ship.size();
      if(length < MAX_ROW) {
        for(let c of range(length, col)) {
          if(this.board[row][c] !== ' ')
            throw new TypeError('Already occupied!');
          this.board[row][c] = ship.getSymbol();
        }
      } else {
        throw new TypeError('Ship doesn\'t fixed on board');
      }
    } else {
      let length = row + ship.size();
      if(length < MAX_ROW) {
        for(let r of range(length, row)) {
          if(this.board[r][col] !== ' ')
            throw new TypeError('Already occupied!');
          this.board[r][col] = ship.getSymbol();
        }
      } else {
        throw new TypeError('Ship doesn\'t fixed on board');
      }
    }
    ship.direction = direction;
    ship.setPosition(row, col);
    ship.isPlace = true;
  }

  showBoard() {
    for(let r of range(MAX_ROW)){
      let line = '';
      for(let c of range(MAX_ROW)){
        line += this.board[r][c];
      }
      console.log(line);
    }
  }
}

class Coordinate{
  // row will be 1 to 10 and col will be A to J
  constructor(row, col) {
    if(range(MAX_ROW).includes(row - 1) && characterRange('A', 'J').includes(col)){
      this.row = row - 1;
      this.col = convertLetterToNumber(col);
    } else {
      throw new TypeError('invalid arguments');
    }
  }
}