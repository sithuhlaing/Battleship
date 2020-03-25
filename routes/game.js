import express from 'express';
import { PlayerBoard } from '../game/board';
import { Coordinate } from '../game/geomatics';

const router = express.Router();
const id = '3-0250-86008-64-1';
const board = new PlayerBoard();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', function(req, res, next) {
  res.json({gameId: id});
  // res.json(board);
});

router.post('/:gameId/placement', function(req, res, next) {
  if(id === req.params.gameId) {
    const {coordinate:{row, col}, ship, direction} = req.body;
    res.json(board.placement(ship, new Coordinate(row, col), direction));
  } else {
    res.json('can\'t find game session');
  }
});

module.exports = router;
