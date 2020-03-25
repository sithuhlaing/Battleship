import {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine,
  Direction,
  SYMBOL,
  SHIPS
} from './ship.js';

import {
  range,
  characterRange,
} from './utils';

const MAX_ROW = 10;

class PlayerBoard {

  constructor(){
    // constructing board
    this.board = [];
    for(let n of range(MAX_ROW)){
      if(!this.board[n])
        this.board[n] = [];
      for(let c in characterRange('A', 'J')){
        this.board[n][parseInt(c)] = '  ';
      }
    }
    // constructing ships for default set
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

    this.no_of_ship_placement = 0;
    this.no_of_fire = 0;
    this.no_of_hit = 0;
    this.isPlacementFinished = false;
  }

  // placing ship on the board
  placement(name, {row, col}, direction ) {
    let ship = this.ships.get(name);
    if(ship.isPlace) {
      throw new TypeError('Already place it');
    }
    if(direction === Direction.HORIZONTAL){
      let length = col + ship.size() -1;
      if(length < MAX_ROW) {
        for(let c of range(ship.size(), col)) {
          if(this.board[row][c] !== '  '){
            throw new TypeError('Already occupied!');
          }
          this.board[row][c] = ship.getSymbol();
        }
      } else {
        throw new TypeError('Ship doesn\'t fixed on board');
      }
    } else {
      let length = row + ship.size();
      if(length < MAX_ROW) {
        for(let r of range(ship.size(), row)) {
          if(this.board[r][col] !== '  '){
            throw new TypeError('Already occupied!');
          }
          this.board[r][col] = ship.getSymbol();
        }
      } else {
        throw new TypeError('Ship doesn\'t fixed on board');
      }
    }
    ship.direction = direction;
    ship.setPosition(row, col);
    ship.isPlace = true;
    this.no_of_ship_placement++;
    if(this.no_of_ship_placement == this.ships.size) {
      this.isPlacementFinished = true;
    }
    return this.status();
  }

  getShipPluck(fun) {
    let ships = [];
    this.ships.forEach(fun(ships));
    return ships;
  }

  status() {
    let ships = this.getShipPluck(ships => 
                  ship => 
                    ships.push({ 
                      name: ship.name, 
                      place: ship.isPlace 
                    })
                );
    return ships.filter(x => x.place)
                .map(x => x.name)
                .join(' ')
                .concat(' are placed');
  }

  // fire the coordiate to hit the ships
  attack({row, col}) {
    if(!this.isPlacementFinished) {
      throw new TypeError('Please wait for ship placement!');
    }

    if(this.board[row][col] === '><') {
      throw new TypeError('you can\'t hit same location');
    }

    let ship = this.ships.get(this.board[row][col]);

    if(ship){
      ship.hit();
      this.no_of_hit++;
      // if(ship.isSink())
      //   console.log(ship.name +' is Sink');
    }
    this.no_of_fire++;
    this.board[row][col] = '><';
    let ships = this.getShipPluck(ships => v => ships.push({[v.name]: v.getHit()}));
    return {
      no_of_fire : this.no_of_fire,
      no_of_hit : this.no_of_hit,
      ships
    };
  }

  isFinished() {
    let lifes = this.getShipPluck((lifes) => ship => lifes.push(ship.life));
    let leftedLife = lifes.reduce((carr, life) => carr + life, 0);
    return leftedLife === 0;
  }

  showBoard() {
    console.log('---------------------------------');
    for(let r of range(MAX_ROW)){
        let line = '';
        for(let c of range(MAX_ROW)){
          line = line + ' ' + this.board[r][c];
        }
        console.log('| ' + line + ' |');
      }
    console.log('---------------------------------');
  }
}

export {
  PlayerBoard,
  MAX_ROW
}