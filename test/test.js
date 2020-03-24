var Player = require('../game/player');
var assert = require('assert');


describe('Battleship Game', function() {
  describe('creating Player', function() {
    it('created Player', function() {
      ships = new Map();
      ships.set(SHIPS.BATTLESHIP1, new Battleship());
      ships.set(SHIPS.CRUISER1, new Cruiser());
      ships.set(SHIPS.CRUISER2, new Cruiser());
      ships.set(SHIPS.DESTROYER1, new Destroyer());
      ships.set(SHIPS.DESTROYER2, new Destroyer());
      ships.set(SHIPS.DESTROYER3, new Destroyer());
      ships.set(SHIPS.SUBMARINE1,new Submarine());
      ships.set(SHIPS.SUBMARINE2, new Submarine());
      ships.set(SHIPS.SUBMARINE3, new Submarine());
      ships.set(SHIPS.SUBMARINE4, new Submarine());
      assert.equal(new Player(), {
        board: [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ],
        ships
      });
    });
  });
});
