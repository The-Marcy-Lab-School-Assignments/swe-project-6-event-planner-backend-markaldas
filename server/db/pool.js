const { Pool } = require('pg');
require('dotenv').config();

const config = {
host: process.env.PGHOST,
port: process.env.PGPORT,
database: process.env.PGDATABASE
};

const pool = new Pool(config);

module.exports = pool;