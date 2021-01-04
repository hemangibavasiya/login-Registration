const util = require("util");
const mysql = require("mysql");

const cool = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "admin",
  password: "adminpass",
  database: "www",
});

pool.getConnection((err, connection) => {
  if (err) console.error("Something Wrong");

  if (connection) connection.release();

  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
