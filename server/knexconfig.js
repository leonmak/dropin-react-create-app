// Process does not require anything

module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: 'dropin'
  },
  pool: {
    min: 0,
    max: 7
  }

});



/*module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'dropindropin',
    port: 3306,
    database: 'dropin'
  },
  pool: {min: 0, max: 7}
});*/
