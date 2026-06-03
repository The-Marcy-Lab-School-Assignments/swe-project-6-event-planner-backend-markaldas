const { Pool } = require('pg');
require('dotenv').config();

const config = {
host: process.env.PGHOST,
port: process.env.PGPORT,
database: process.env.PGDATABASE
};

const prodConfig = {
    connectionString: process.env.PG_CONNECTION_STRING,
};

const pool = new Pool(process.env.PG_CONNECTION_STRING ? prodConfig : config);



module.exports = pool;