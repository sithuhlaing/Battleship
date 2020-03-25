import express from 'express';

import { PlayerBoard } from '../game/board';
import { Coordinate } from '../game/geomatics';
import { connect, getDB, getClient, getPrimaryKey } from "../db";
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
    else {
      const board = new PlayerBoard();
      //findOneAndUpdate({_id: id}, {$set: {board}}, {returnOriginal: false}
      getDB().collection(collection).insertOne(board, (err, r) => {
        if(err) next(err);
        else
          res.send({gameId : r.insertedId});
      });
    }
  });
  // res.send('here');
});

router.post('/:gameId/placement', function(req, res, next) {
  connect((err) => {
    if (err) next(err);
    else {
      let boardCollection = getDB().collection(collection);
      boardCollection.findOne(getPrimaryKey(req.params.gameId), (err, docs) => {
        if(err)
          next(err);
        else {
          getClient().close();
          const {coordinate:{row, col}, ship, direction} = req.body;
          const board = new PlayerBoard();
          board.paserBoard(docs);
          const result = board.placement(ship, new Coordinate(row, col), direction);
          boardCollection.updateOne(getPrimaryKey(req.params.gameId), board, function(err) {
            if(err) next(err);
            else  
              res.json(result);
          });
        }
      });
    }
  });
});

module.exports = router;
