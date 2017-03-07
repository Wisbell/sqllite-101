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



// returns an array and all values from employees

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

// function only fired once - lin 70

// db.all(`SELECT * FROM employees`, (err, allRows) => {
//   // console.log(allRows)
//   allRows.forEach( ({ id, first, last, department, salary}) => {
//     // console.log(`woah - ${each.first}`, each)
//     // console.log(`woah - ${each.last}`, each)
//     // console.log(`woah - ${each.id}`, each)
//     // console.log(`woah - ${each.department}`, each)

//     console.log(`
//       ${id} ${first} ${last}
//       from ${department} Department.
//       Salary: ${salary}
//       `)
//   })
// })


// each allows call back function to fire for each row returned
// you dont have to wait for all values to be returned

// does not return an array - better for larger databases

// db.each(`SELECT * FROM employees`, (err, { id, first, last, department, salary}) => {
//   // console.log(each)

//   console.log(`
//       ${id} ${first} ${last}
//       from ${department} Department.
//       Salary: ${salary}
//       `)
// })



// db.each(`SELECT * FROM employees`, (err, { id, first, last, department, salary}) => {
//   // console.log(each)
//   console.log(new Date.getMilliseconds())
//   console.log(`
//       ${id} ${first} ${last}
//       from ${department} Department.
//       Salary: ${salary}
//       `)
// })



// sort all records alphabetically

// create a new array of all employees tha tmake more than 50 000

// use this new array , create an arra ythat says each eprsons first and last name, as well as their salary

db.all(`SELECT * FROM employees ORDER BY first ASC`, (err, allRows) => {

  if(err) { return console.log(err) };

  let bigMoney = allRows.filter((obj)=>{
    return obj.salary >= 50000
  })

  let coolArray = bigMoney.map((obj)=>{
    return `${obj.first} ${obj.last} makes ${obj.salary}`
  })

  coolArray.forEach((each)=> console.log(each))

})




/*
module.exports = { dropEmployees }

require('dropEmployees') - runs file


can call dropEmployees.js from node
*/
