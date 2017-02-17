'use strict';

module.exports = {
  port: process.env.PORT || 8080,
  db: {
    options: {
      dburl: process.env.DATABASE_URL,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '5432'
    }
  }
};
