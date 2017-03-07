'use strict'; // applies stricter subset of javascript to yoru file - interpreter will throw silent errors

// uses sqlites verbose method to help track down errors more easily
const sqlite3 = require('sqlite3').verbose()

// creates database if it does not exist - other wise uses the db in the string
const db = new sqlite3.Database('example.sqlite')  // new Constructor


const dropEmployees = () => {
  db.run(`DROP TABLE employees`)
};

// db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary NUMBER(6,2))");
// db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary NUM(6,2))");
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)");

// db.run('INSERT INTO employees VALUES (1, "Ashley", "Irwin", 1)');

// dropEmployees()


const populateEmployees = () => {
  const { list } = require('./employees.json')

  list.forEach(each => {
    db.run(`INSERT INTO employees VALUES (
        ${each.id},
        "${each.firstName}",
        "${each.lastName}",
        ${each.salary},
        "${each.dept}"
      )`)
  })
};

// populateEmployees()

// only gets first row - maybe use orderby or group by ASC or DESC

// db.get(`SELECT * FROM employees`, (err, row) => {
//   console.log(row)
// })

// returns an array

// db.all(`SELECT * FROM employees`, (err, allRows) => {
//   // console.log(allRows)
//   allRows.forEach( each => {
//     // console.log(`woah - ${each.first}`, each)
//     // console.log(`woah - ${each.last}`, each)
//     // console.log(`woah - ${each.id}`, each)
//     // console.log(`woah - ${each.department}`, each)

//     console.log(`
//       ${each.id} ${each.first} ${each.last}
//       from ${each.department} Department.
//       Salary: ${each.salary}
//       `)
//   })
// })


// Destructuring

db.all(`SELECT * FROM employees`, (err, allRows) => {
  // console.log(allRows)
  allRows.forEach( ({ id, first, last, department, salary}) => {
    // console.log(`woah - ${each.first}`, each)
    // console.log(`woah - ${each.last}`, each)
    // console.log(`woah - ${each.id}`, each)
    // console.log(`woah - ${each.department}`, each)

    console.log(`
      ${id} ${first} ${last}
      from ${department} Department.
      Salary: ${salary}
      `)
  })
})
