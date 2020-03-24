const Direction = {
  VERTICAL : 'vertical',
  HORIZONTAL : 'horizontal'
}

class Ship {
  
  constructor() {
    if (this.constructor === Ship) {
      throw new TypeError('Abstract class "Ship" cannot be instantiated directly.'); 
    }

    if (this.size === undefined) {
      throw new TypeError('Classes extending the Ship abstract class');
    }

    if (this.getSymbol === undefined) {
      throw new TypeError('Classes extending the Ship abstract class');
    }

    this.life = this.size();
    // this.name = name;
    this.direction = Direction.HORIZONTAL;
    this.isPlace = false;
  }

  hit(){
    life--;
  }

  setPosition({row, col}){
    this.row,
    this.col
  }
}

class Battleship extends Ship {
  size() {
    return 4;
  }
  getSymbol(){
    return 'B';//'Battleship';
  }

}

class Cruiser extends Ship {
  size() {
    return 3;
  }
  getSymbol(){
    return 'C'; //'Cruiser';
  }
}

class Destroyer extends Ship {
  size() {
    return 2;
  }
  getSymbol(){
    return 'D'; //'Destroyer';
  }
}

class Submarine extends Ship {
  size() {
    return 3;
  }
  getSymbol(){
    return 'S'; //'Submarine';
  }
}

export default {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine,
  Direction
}