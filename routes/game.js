import express from 'express';

import { PlayerBoard } from '../game/board';
import { Coordinate } from '../game/geomatics';
import { connect, getDB } from "../db";
import 'dotenv/config';

const router = express.Router();
const id = '3-0250-86008-64-1';
const board = new PlayerBoard();
const collection = 'board';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hey good news');
});

router.post('/new', function(req, res, next) {
  connect((err) => {
    if(err)
      next(err);
    else
      getDB().collection(collection).find({}).toArray((err, docs) => {
        if(err)
          next(err);
        else {
          console.log(docs);
          res.json(docs);
        }
      });
  });
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
