import {
  PlayerBoard,
  MAX_ROW, 
} from '../game/board';

import {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine,
  Direction,
  SYMBOL,
  SHIPS,
} from '../game/ship';

import {
  Coordinate,
} from '../game/geomatics';

import {
  range,
  characterRange,
} from '../game/utils';

var assert = require('assert');
var expect = require('chai').expect


function getInitData(){
  let board = new PlayerBoard();

  board.placement(SYMBOL[SHIPS.DESTROYER1], new Coordinate(1, 'A'), Direction.HORIZONTAL);
  board.placement(SYMBOL[SHIPS.CRUISER1], new Coordinate(1, 'D'), Direction.VERTICAL);
  board.placement(SYMBOL[SHIPS.BATTLESHIP1], new Coordinate(1, 'G'), Direction.HORIZONTAL);
  board.placement(SYMBOL[SHIPS.SUBMARINE1], new Coordinate(4, 'A'), Direction.VERTICAL);
  board.placement(SYMBOL[SHIPS.CRUISER2], new Coordinate(4, 'F'), Direction.HORIZONTAL);
  board.placement(SYMBOL[SHIPS.DESTROYER2], new Coordinate(4, 'J'), Direction.VERTICAL);
  board.placement(SYMBOL[SHIPS.SUBMARINE2], new Coordinate(7, 'F'), Direction.VERTICAL);
  board.placement(SYMBOL[SHIPS.SUBMARINE3], new Coordinate(7, 'J'), Direction.VERTICAL);
  board.placement(SYMBOL[SHIPS.SUBMARINE4], new Coordinate(8, 'A'), Direction.HORIZONTAL);
  board.placement(SYMBOL[SHIPS.DESTROYER3], new Coordinate(10, 'A'), Direction.HORIZONTAL);
  return board;
}

describe('Battleship Game', function() {
  describe('creating Player Board', function() {
    it('win the game', function() {
      let board = getInitData();
      board.attack(new Coordinate(1, 'A'));
      board.attack(new Coordinate(1, 'B'));
      board.attack(new Coordinate(1, 'D'));
      board.attack(new Coordinate(2, 'D'));
      board.attack(new Coordinate(3, 'D'));
      board.attack(new Coordinate(1, 'G'));
      board.attack(new Coordinate(1, 'H'));
      board.attack(new Coordinate(1, 'I'));
      board.attack(new Coordinate(1, 'J'));
      board.attack(new Coordinate(3, 'A'));
      board.attack(new Coordinate(4, 'A'));
      board.attack(new Coordinate(5, 'A'));
      board.attack(new Coordinate(6, 'A'));
      board.attack(new Coordinate(4, 'F'));
      board.attack(new Coordinate(4, 'G'));
      board.attack(new Coordinate(4, 'H'));
      board.attack(new Coordinate(3, 'J'));
      board.attack(new Coordinate(4, 'J'));
      board.attack(new Coordinate(5, 'J'));
      board.attack(new Coordinate(7, 'F'));
      board.attack(new Coordinate(8, 'F'));
      board.attack(new Coordinate(9, 'F'));
      board.attack(new Coordinate(8, 'A'));
      board.attack(new Coordinate(8, 'B'));
      board.attack(new Coordinate(8, 'C'));
      board.attack(new Coordinate(7, 'J'));
      board.attack(new Coordinate(8, 'J'));
      board.attack(new Coordinate(9, 'J'));
      board.attack(new Coordinate(10, 'A'));
      board.attack(new Coordinate(10, 'B'));
      board.showBoard();
      console.log(board.isFinished());
      // console.log(board.ships);
    });

    // it('created Player', function() {
    //   // console.log(new PlayerBoard());
    //   let board = [];
    //   for(let r of range(MAX_ROW)){
    //     if(!board[r])
    //       board[r] = [];
    //     for(let c of range(MAX_ROW)){
    //       board[r][c] = ' ';
    //     }
    //   }
    //   let ships = new Map();
    //   ships.set(SHIPS.BATTLESHIP1, new Battleship());
    //   ships.set(SHIPS.CRUISER1, new Cruiser());
    //   ships.set(SHIPS.CRUISER2, new Cruiser());
    //   ships.set(SHIPS.DESTROYER1, new Destroyer());
    //   ships.set(SHIPS.DESTROYER2, new Destroyer());
    //   ships.set(SHIPS.DESTROYER3, new Destroyer());
    //   ships.set(SHIPS.SUBMARINE1,new Submarine());
    //   ships.set(SHIPS.SUBMARINE2, new Submarine());
    //   ships.set(SHIPS.SUBMARINE3, new Submarine());
    //   ships.set(SHIPS.SUBMARINE4, new Submarine());
    //   assert.equal(new PlayerBoard(), {
    //     board,
    //     ships
    //   });
    // });

    // it('placing on Board', function() {
    //   let player = new PlayerBoard();
    //   player.placement(SHIPS.CRUISER1, new Coordinate(1, 'D'), Direction.VERTICAL);
    //   expect(() => player.placement(SHIPS.BATTLESHIP1, new Coordinate(1, 'D'), Direction.HORIZONTAL)).to.throw(new TypeError('Already occupied!'));
    // });

    it('general test', function(){
      let board = getInitData();
      console.log(board.showBoard());
//       assert.equal(
// `---------------------------------
// |  D1 D1    C1       B1 B1 B1 B1 |
// |           C1                   |
// |           C1                   |
// |  S1             C2 C2 C2    D2 |
// |  S1                         D2 |
// |  S1                            |
// |                 S2          S3 |
// |  S4 S4 S4       S2          S3 |
// |                 S2          S3 |
// |                                |
// ---------------------------------`,
//       board.showBoard());
      // console.log(
      board.attack(new Coordinate(4, 'C')),
      board.attack(new Coordinate(5, 'F')),
      board.attack(new Coordinate(5, 'G')),
      board.attack(new Coordinate(6, 'B')),
      board.attack(new Coordinate(6, 'H')),
      board.attack(new Coordinate(6, 'J')),
      board.attack(new Coordinate(7, 'D')),
      board.attack(new Coordinate(7, 'J')),
      board.attack(new Coordinate(8, 'A')),
      board.attack(new Coordinate(8, 'B')),
      board.attack(new Coordinate(8, 'H'))//);

      board.showBoard();
      console.log(board.isFinished());
    });
  });
});
