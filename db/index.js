import { MongoClient, ObjectID } from 'mongodb';
import 'dotenv/config';

const dbname = "battleship";
const url = "mongodb://localhost:27017";
const mongoOptions = { useNewUrlParser : true, useUnifiedTopology : true};

const state = {
  db : null,
  client: null,
};

const connect = (cb) => {
  if(state.db)
    cb();
  else {
    MongoClient.connect(url, mongoOptions, function (err, client) {
      if (err) {
        console.log(err.servers);
        cb(err);
      } else {
        state.db = client.db(dbname);
        state.client = client;
        cb();
      }
    });
  }
}

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}

const getDB = () => {
  return state.db;
}

const getClient = () => {
  return state.client;
}

export {
  getDB,
  connect,
  getPrimaryKey,
  getClient,
}