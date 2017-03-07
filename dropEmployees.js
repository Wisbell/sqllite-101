'use strict'; // applies stricter subset of javascript to yoru file - interpreter will throw silent errors

// uses sqlites verbose method to help track down errors more easily
const sqlite3 = require('sqlite3').verbose()

// creates database if it does not exist - other wise uses the db in the string
const db = new sqlite3.Database('example.sqlite')  // new Constructor


const dropEmployees = () => {
  db.run(`DROP TABLE employees`)
};


dropEmployees()
