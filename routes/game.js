import express from 'express';
import keygen from 'keygen';
import { PlayerBoard } from '../game/board';
import { Coordinate } from '../game/geomatics';
import 'dotenv/config';

import mysql from 'mysql';

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'battleship'
});

const router = express.Router();
const id = '3-0250-86008-64-1';

// const collection = 'board';

con.connect();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hey good news');
});

router.post('/new', function(req, res, next) {
  const board = JSON.stringify((new PlayerBoard()).toStringifyObj());
  const gameId = keygen.url(10); 
  const sql = 'INSERT INTO boards SET ?';
  con.query(sql, {board, gameId} , (err, r) => {
    if (err) next(err);
    res.json({gameId});
  })
});

router.get('/:gameId', function(req, res, next) {
  let sql = 'SELECT * FROM boards WHERE gameId = ?';
  const gameId = req.params.gameId;
  con.query(sql, [gameId], (err, result) => {
    if(err) res.json(err);
    if(result.length === 0)
      res.json({err: 'can\'t find'}); 
    const board = new PlayerBoard();
    let json = JSON.parse(result[0].board);
    board.paserBoard(json);
    res.send(board.showBoard());
  });
});

// example of post json sample
// {
// 	"ship": "S4",
// 	"coordinate": {"row": 2, "col": "J"},
// 	"direction": "vertical"
// }
router.post('/:gameId/placement', function(req, res, next) {
  let sql = 'SELECT * FROM boards WHERE gameId = ?';
  const gameId = req.params.gameId;
  con.query(sql, [gameId], (err, result) => {
    if(err) res.json(err);
    if(result.length === 0)
      res.json({err: 'can\'t find'});
    const {coordinate:{row, col}, ship, direction} = req.body;
    const board = new PlayerBoard();
    let json = JSON.parse(result[0].board);
    board.paserBoard(json);
    try {
      result = board.placement(ship, new Coordinate(row, col), direction);
    } catch {
      res.json({Error: 'Already place it'});
    }
    sql = 'UPDATE boards SET board = ? WHERE gameId = ?'
    json = JSON.stringify(board.toStringifyObj());
    con.query(sql, [json, gameId], (err, rep) => {
      res.json(result);
    });
  });
});

router.post('/:gameId/placement', function(req, res, next) {




// con.end();
module.exports = router;