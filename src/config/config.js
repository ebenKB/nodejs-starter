// import dotenv from 'dotenv'

// create the congiguration file for the system  critical data
const config = {
  port: process.env.port || 8000,
  db: process.env.MONGODB_URI,
  host: '127.0.0.1',
  secret: process.env.secret,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

export default config;
