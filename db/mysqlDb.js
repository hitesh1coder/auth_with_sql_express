const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6681453",
  password: "76gzRA9zlC",
  database: "sql6681453",
});

const connectDb = () => {
  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    } else {
      console.log("database connected");
    }
  });
};

module.exports = { connection, connectDb };
