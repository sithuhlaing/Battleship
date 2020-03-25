import {
  PlayerBoard, 
  SHIPS,
  range,
  characterRange,
  MAX_ROW,
  Coordinate,
} from '../game/player';
import {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine,
  Direction,
  SYMBOL,
} from '../game/ship';
var assert = require('assert');
var expect = require('chai').expect


describe('Battleship Game', function() {
  describe('creating Player Board', function() {
    // it('created Player', function() {
    //   let board = [];
    //   for(let n of range(MAX_ROW)){
    //     if(!board[n])
    //       board[n] = [];
    //     for(let c in characterRange('A', 'J')){
    //       board[n][parseInt(c)] = ' ';
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
    //   assert.equal(new Player(), {
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
      let player1 = new PlayerBoard();

      player1.placement(SYMBOL[SHIPS.DESTROYER1], new Coordinate(1, 'A'), Direction.HORIZONTAL);
      player1.placement(SYMBOL[SHIPS.CRUISER1], new Coordinate(1, 'D'), Direction.VERTICAL);
      player1.placement(SYMBOL[SHIPS.BATTLESHIP1], new Coordinate(1, 'G'), Direction.HORIZONTAL);
      player1.placement(SYMBOL[SHIPS.SUBMARINE1], new Coordinate(4, 'A'), Direction.VERTICAL);
      player1.placement(SYMBOL[SHIPS.CRUISER2], new Coordinate(4, 'F'), Direction.HORIZONTAL);
      player1.placement(SYMBOL[SHIPS.DESTROYER2], new Coordinate(4, 'J'), Direction.VERTICAL);
      player1.placement(SYMBOL[SHIPS.SUBMARINE2], new Coordinate(7, 'F'), Direction.VERTICAL);
      player1.placement(SYMBOL[SHIPS.SUBMARINE3], new Coordinate(7, 'J'), Direction.VERTICAL);
      player1.placement(SYMBOL[SHIPS.SUBMARINE4], new Coordinate(8, 'A'), Direction.HORIZONTAL);

      // console.log(player1.showBoard());
      assert.equal(
`---------------------------------
|  D1 D1    C1       B1 B1 B1 B1 |
|           C1                   |
|           C1                   |
|  S1             C2 C2 C2    D2 |
|  S1                         D2 |
|  S1                            |
|                 S2          S3 |
|  S4 S4 S4       S2          S3 |
|                 S2          S3 |
|                                |
---------------------------------`,
      player1.showBoard());
    });
  });
});
