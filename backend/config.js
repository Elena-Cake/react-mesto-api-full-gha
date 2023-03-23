require('dotenv').config();

const { NODE_ENV = 'production' } = process.env;
const { PORT = '3000' } = process.env;
const { JWT_SECRET = 'idontknow1secret' } = process.env;
const { DB_CONNECT_PATH = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  DB_CONNECT_PATH,
  JWT_SECRET,
};
