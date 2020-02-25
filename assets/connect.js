const mysql = require("mysql");
const inquirer = require("inquirer");

// let managers = [];

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
    // runSearch();
    getRoles();
    console.log("you are connected");
});

let role = [];
let managers = [];

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View departments",
          "View roles",
          "View employees",
          "Add department",
          "Add role",
          "Add employee"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View departments":
          departmentSearch();
          break;
  
        case "View roles":
          roleSearch();
          break;
  
        case "View employees":
          employeeSearch();
          break;
  
        case "Add department":
          departmentCreate();
          break;
  
        case "Add role":
          departmentCreate();
          break;

        case "Add employee":
          addEmployee();
          break;
        }
      });
  }

function departmentSearch(){
        const query = "SELECT * FROM DEPARTMENT";
        connection.query( query, function(err, res) {
            // console.log(res);
            for (let i = 0; i < res.length; i++) {
            console.log("Department: " + res[i].name + " ID: " + res[i].id);
            }
            runSearch();
        });
}

function roleSearch(){
    const query = "SELECT * FROM role";
    connection.query( query, function(err, res) {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
        console.log("Role: " + res[i].title + " || ID: " + res[i].id + "|| Salary: " + res[i].salary + " || Department ID: " + res[i].department_id);
        }
        runSearch();
    });
}

function employeeSearch(){
    const query = "SELECT * FROM employee";
    connection.query( query, function(err, res) {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
        console.log("Name: " + res[i].first_name +" "+res[i].last_name+ " || ID: " + res[i].id + "|| Role ID: " + res[i].role_id);
        }
        runSearch();
    });
}

function addEmployee(){
    
        
    inquirer
    .prompt ([
        {
            name: "first_name",
            type: "input",
            message: "What is the employees first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employees last name?"
        },
        {
            name: "role",
            type:"rawlist",  
            message: "What role does this employee have?",
            choices: role
        },
        {
            name: "manager",
            type: "rawlist",
            message: "Who is their manager",
            choices: managers
        }
    ])
    .then (function (answer){
        console.log(answer);
        // connection.query("INSERT INTO employee")
    })
    
};

async function getRoles() {


    let query = 'SELECT * FROM role'
  
    role = await connection.query(query, function (){
        ({
            name: title,
            value: id
        })
    })

   
     
    const newQuery = 'SELECT * FROM employee'

    managers = await connection.query(newQuery, function () {
        (
            {
                name: first_name + " " + last_name,
                value: id
            },
            {
                name: "no manager",
                value: null
            }
        )
    })
    runSearch();
}

