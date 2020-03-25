import {
  convertLetterToNumber,
  range,
  characterRange,
} from './utils';

import {
  MAX_ROW
} from './board';

const Direction = {
  VERTICAL : 'vertical',
  HORIZONTAL : 'horizontal',
  parse(str) {
    if(str === this.VERTICAL || str === this.HORIZONTAL) {
      return str;
    }
    throw new TypeError('Please use this keyword [vertical | horizontal]')
  }
}

class Coordinate{
  // row will be 1 to 10 and col will be A to J
  constructor(row, col) {
    let index = parseInt(row) - 1;
    console.log(index);
    if(range(MAX_ROW).includes(index) && characterRange('A', 'J').includes(col)){
      this.row = index;
      this.col = convertLetterToNumber(col);
    } else {
      throw new TypeError('invalid arguments');
    }
  }
}

export {
  Direction,
  Coordinate
}