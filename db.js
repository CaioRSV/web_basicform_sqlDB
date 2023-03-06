var Printable = "";

const mysql = require('mysql2');
const fs = require('fs')

const dotenv = require('dotenv');
dotenv.config();

async function runQuery() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise();

  const result = await pool.query('SELECT * FROM bancoprojetoform.name_age_table');
  //console.log(result);
}

async function insertTable(name,age) {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
      }).promise();

      pool.query("INSERT into bancoprojetoform.name_age_table (name,age) VALUES ('"+name+"', "+age+");")
}

async function seeTable() {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
      }).promise();
      const infoHTML = "";
      const [rows] = await pool.query('SELECT * FROM bancoprojetoform.name_age_table');

      let htmlString = "";

      for (let i = 0; i < rows.length; i++) {
        htmlString += `<p>${JSON.stringify([rows[i]])}</p>\n`;
      }
      //console.log(htmlString);
      return htmlString;
    }   

runQuery();
seeTable();

module.exports = {
    insertTable,
    seeTable
  };

