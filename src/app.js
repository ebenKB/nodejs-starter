
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
// import path from 'path';
import cluster from 'cluster';
import os from 'os';
import db from './config/db';
import Router from '../lib/router';
// import Seed from '../lib/util/seed';

// eslint-disable-next-line no-unused-expressions
// Seed;

// check the number cpu cores
const numCPU = os.cpus().length;

// require('dotenv').config();
dotenv.config();
db.initDB()
  .then(() => {
    console.log('Init DB success');
  })
  .catch((err) => {
    console.log(`init DB FAILURE ${err}`);
  });

if (cluster.isMaster) {
  // create a node worker process
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCPU; i++) {
    cluster.fork();
  }

  // listen to dead child process
  cluster.on('exit', () => {
    cluster.fork(); // replace any dead process
  });
} else {
  // set app defaults
  const app = express();
  app.use(bodyParser.json());
  app.get('/', (req, res) => {
    res.send('working api');
  });
  app.use('/api', Router);
  app.listen(process.env.PORT || 4040, () => {
    console.log('the server has started on port : ', 4040, 'CPU cores : ', numCPU);
  });
}
