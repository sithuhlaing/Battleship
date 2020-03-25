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
  HORIZONTAL : 'horizontal'
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
  Direction,
  Coordinate
}