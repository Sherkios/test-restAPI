const path = require('path');
const knex = require('knex');
const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite3'),
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true,
  },
};

const db = knex(config.development);

module.exports = db;
