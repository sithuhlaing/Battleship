import express from 'express';
import keygen from 'keygen';
import mysql from 'mysql';

import 'dotenv/config';

import { PlayerBoard } from '../game/board';
import { Coordinate } from '../game/geomatics';

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'battleship'
});

const router = express.Router();
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
    // console.log(board.showBoard());
    res.write(board.showBoard());
    res.end();
  });
});

router.get('/:gameId/status', function(req, res, next) {
  let sql = 'SELECT * FROM boards WHERE gameId = ?';
  const gameId = req.params.gameId;
  con.query(sql, [gameId], (err, result) => {
    if(err) res.json(err);
    if(result.length === 0)
      res.json({err: 'can\'t find'}); 
    const board = new PlayerBoard();
    let json = JSON.parse(result[0].board);
    board.paserBoard(json);
    res.json(board.toStringifyObj());
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

// sample of post data
// {
// 	"coordinate": {"row": 1, "col": "I"}
// }
router.post('/:gameId/attack', function(req, res, next) {
  let sql = 'SELECT * FROM boards WHERE gameId = ?';
  const gameId = req.params.gameId;
  con.query(sql, [gameId], (err, result) => {
    if(err) res.json(err);
    if(result.length === 0)
      res.json({err: 'can\'t find'});
    const { coordinate:{row, col} } = req.body;
    const board = new PlayerBoard();
    let json = JSON.parse(result[0].board);
    board.paserBoard(json);
    try {
      result = board.attack(new Coordinate(row, col));
    } catch (e) {
      res.json({Error : 'inside error'});
    }
    sql = 'UPDATE boards SET board = ? WHERE gameId = ?'
    json = JSON.stringify(board.toStringifyObj());
    con.query(sql, [json, gameId], (err, rep) => {
      res.json(result);
    });
  });
});

// con.end();
module.exports = router;