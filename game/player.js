import {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine,
  Direction,
  SYMBOL,
} from './ship.js';

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
// const intRange = (n) => [...Array(n).keys()];
const range = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt);
const characterRange = (startChar, endChar) => String.fromCharCode(...range(endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1, startChar.charCodeAt(0)));

class PlayerBoard {
  constructor(){
    this.board = [];
    for(let n of range(MAX_ROW)){
      if(!this.board[n])
        this.board[n] = [];
      for(let c in characterRange('A', 'J')){
        this.board[n][parseInt(c)] = '  ';
      }
    }
    this.ships = new Map();
    this.ships.set(SYMBOL.Battleship1, new Battleship(SHIPS.BATTLESHIP1));
    this.ships.set(SYMBOL.Cruiser1, new Cruiser(SHIPS.CRUISER1));
    this.ships.set(SYMBOL.Cruiser2, new Cruiser(SHIPS.CRUISER2));
    this.ships.set(SYMBOL.Destroyer1, new Destroyer(SHIPS.DESTROYER1));
    this.ships.set(SYMBOL.Destroyer2, new Destroyer(SHIPS.DESTROYER2));
    this.ships.set(SYMBOL.Destroyer3, new Destroyer(SHIPS.DESTROYER3));
    this.ships.set(SYMBOL.Submarine1, new Submarine(SHIPS.SUBMARINE1));
    this.ships.set(SYMBOL.Submarine2, new Submarine(SHIPS.SUBMARINE2));
    this.ships.set(SYMBOL.Submarine3, new Submarine(SHIPS.SUBMARINE3));
    this.ships.set(SYMBOL.Submarine4, new Submarine(SHIPS.SUBMARINE4));
  }

  placement(name, {row, col}, direction ) {
    let ship = this.ships.get(name);
    if(ship.isPlace) {
      throw new TypeError('Already place it');
    }
    if(direction === Direction.HORIZONTAL){
      let length = col + ship.size() -1;
      if(length < MAX_ROW) {
        for(let c of range(ship.size(), col)) {
          if(this.board[row][c] !== '  ')
            throw new TypeError('Already occupied!');
          this.board[row][c] = ship.getSymbol();
        }
      } else {
        throw new TypeError('Ship doesn\'t fixed on board');
      }
    } else {
      let length = row + ship.size();
      if(length < MAX_ROW) {
        for(let r of range(ship.size(), row)) {
          if(this.board[r][col] !== '  ')
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

  attack({row, col}) {
    switch(this.board[row, col]) {
      case SYMBOL.Battleship1: 
        let ship = this.ships.get(SYMBOL.Battleship1)
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Cruiser1: 
        this.ships.get(SYMBOL.Cruiser1);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Cruiser2: 
        this.ships.get(SYMBOL.Cruiser2);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Destroyer1: 
        this.ships.get(SYMBOL.Destroyer1);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Destroyer2: 
        this.ships.get(SYMBOL.Destroyer2);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Destroyer3: 
        this.ships.get(SYMBOL.Destroyer3);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Submarine1: 
        this.ships.get(SYMBOL.Submarine1);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Submarine2: 
        this.ships.get(SYMBOL.Submarine2);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Submarine3: 
        this.ships.get(SYMBOL.Submarine3);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case SYMBOL.Submarine4: 
        this.ships.get(SYMBOL.Submarine4);
        ship.hit();
        console.log(ship.name +' is hitted');
        if(ship.isSink())
          console.log(ship.name +' is Sink');
        break;
      case '><': 
        throw new TypeError('you can\'t hit same location');
    }
    this.board[row][col] = '><';
  }

  showBoard() {
    // let s = '---------------------------------\n';
    // for(let r of range(MAX_ROW)){
    //   let line = '';
    //   for(let c of range(MAX_ROW)){
    //     line = line + ' ' + this.board[r][c];
    //   }
    //   s += '| ' + line + ' |\n';
    // }
    // s += '---------------------------------\n';
    // return s;
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

export {
  MAX_ROW,
  SHIPS,
  convertLetterToNumber,
  range,
  characterRange,
  PlayerBoard,
  Coordinate
}