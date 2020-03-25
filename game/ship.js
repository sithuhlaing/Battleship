import {
  range,
  SHIPS,
} from './player';

const Direction = {
  VERTICAL : 'vertical',
  HORIZONTAL : 'horizontal'
}

const SYMBOL = {
  Battleship1: 'B1',
  Cruiser1: 'C1',
  Cruiser2: 'C2',
  Destroyer1: 'D1',
  Destroyer2: 'D2',
  Destroyer3: 'D3',
  Submarine1: 'S1',
  Submarine2: 'S2',
  Submarine3: 'S3',
  Submarine4: 'S4',
}

class Ship {
  
  constructor(name) {
    if (this.constructor === Ship) {
      throw new TypeError('Abstract class "Ship" cannot be instantiated directly.'); 
    }

    if (this.size === undefined) {
      throw new TypeError('Classes extending the Ship abstract class');
    }

    this.life = this.size();
    this.name = name;
    this.direction = Direction.HORIZONTAL;
    this.isPlace = false;
  }

  hit(){
    life--;
  }

  isSink(){
    return life === 0;
  }

  setPosition({row, col}){
    this.row,
    this.col
  }

  getCoordinateSeq(){
    if(this.isPlace){
      if(this.direction === Direction.HORIZONTAL){
        range(size(), this.col).map(x => [this.row, x]);
      } else {
        range(this.row, size()).map(x => [x, this.col]);
      }
    }
    return [];
  }

  getSymbol() {
    switch(this.name) {
      case SHIPS.BATTLESHIP1: return SYMBOL[SHIPS.BATTLESHIP1]; // 'B1';
      case SHIPS.CRUISER1: return SYMBOL[SHIPS.CRUISER1]; // 'C1';
      case SHIPS.CRUISER2: return SYMBOL[SHIPS.CRUISER2]; // 'C2';
      case SHIPS.DESTROYER1: return SYMBOL[SHIPS.DESTROYER1]; // 'D1';
      case SHIPS.DESTROYER2: return SYMBOL[SHIPS.DESTROYER2]; // 'D2';
      case SHIPS.DESTROYER3: return SYMBOL[SHIPS.DESTROYER3]; // 'D3';
      case SHIPS.SUBMARINE1: return SYMBOL[SHIPS.SUBMARINE1]; // 'S1';
      case SHIPS.SUBMARINE2: return SYMBOL[SHIPS.SUBMARINE2]; // 'S2';
      case SHIPS.SUBMARINE3: return SYMBOL[SHIPS.SUBMARINE3]; // 'S3';
      case SHIPS.SUBMARINE4: return SYMBOL[SHIPS.SUBMARINE4]; // 'S4';
    }
  }
}

class Battleship extends Ship {
  size() {
    return 4;
  }
}

class Cruiser extends Ship {
  size() {
    return 3;
  }
}

class Destroyer extends Ship {
  size() {
    return 2;
  }
}

class Submarine extends Ship {
  size() {
    return 3;
  }
}

export {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine,
  Direction,
  SYMBOL
}