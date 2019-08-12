// establish a databse connection

import mongoose from 'mongoose';

import config from './config';

// const uri = 'mongodb+srv://tester:ebentestdb@cluster0-qbc48.mongodb.net/test?retryWrites=true';

const uri = 'mongodb://hubkbs:*.*6095KBADJEi@ds159025.mlab.com:59025/devmech';
const db = {};
db.initDB = () => new Promise((resolve, reject) => {
  console.log('in the db with :', config.db);
  mongoose.connect(config.db, { useNewUrlParser: true })
    .then((data) => {
      console.log('Database Connection is successful...');
      resolve(data);
    })
    .catch((err) => {
      console.log('An error occured while connecting to the database.');
      reject(new Error(`Unable to connect to the database ${err}`));
    });
});

export default db;
