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
let department = [];
 

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
          addDepartment();
          break;
  
        case "Add role":
          addRole();
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
        // console.log(res);
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
            name: "role_id",
            type:"rawlist",  
            message: "What role does this employee have?",
            choices: role
        },
        {
            name: "manager_id",
            type: "rawlist",
            message: "Who is their manager",
            choices: managers
        }
    ])
    .then (function (answer){
        console.log(answer);
        // connection.query(
        //     "INSERT INTO employee SET ?",
        //     {
        //       first_name: answer.first_name,
        //       last_name: answer.last_name,
        //       role_id: answer.role_id,
        //       manager_id: answer.manager_id
        //     },
        //     function(err) {
        //       if (err) throw err;
        //       console.log("Your employee was added successfully!");
        //       runSearch();
        //     }
        //   );
    })
    
};

function addDepartment(){
    
        
    inquirer
    .prompt ([
        {
            name: "name",
            type: "input",
            message: "What department do you want to add?"
        },
    ])
    .then (function (answer){
        console.log(answer);
        connection.query(
            "INSERT INTO department SET ?",
            {
              name: answer.name
            },
            function(err) {
              if (err) throw err;
              console.log("Your employee was added successfully!");
              runSearch();
            }
          );
    })
};

function addRole(){
    
        
    inquirer
    .prompt ([
        {
            name: "title",
            type: "input",
            message: "What role do you want to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "How much money does this role make?" 
        },
        {
            name: "department_id",
            type: "rawlist",
            message: "What Department does this role work under?",
            choices: department
        }
    ])
    .then (function (answer){
        console.log(answer);
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.title,
              salary: parseInt(answer.salary),
              department_id: answer.department_id
            },
            function(err) {
              if (err) throw err;
              console.log("Your employee was added successfully!");
              runSearch();
            }
          );
    })
};

async function getRoles() {


    const query = 'SELECT * FROM role'
  
    await connection.query(query, function (err, res){
        if (err) throw err;
        console.log(res);
        for (let i = 0; i < res.length; i++){
                role.push({
                name: res[i].title,
                value: res[i].id
            });
        }
        // console.log(role);
    });

        
        await connection.query("SELECT * FROM department", function(err, res){
            if (err) throw err;
            console.log(res);
            for (let i = 0; i<res.length; i++){
                
                department.push({
                    name: res[i].name,
                    department_id: res[i].id
                })          
            }
            // console.log(department);
        });

    const newQuery = 'SELECT * FROM employee'

    await connection.query(newQuery, function (err, res) {
        if (err) throw err;
        // console.log(res);

        for (let i = 0; i<res.length; i++){
            managers.push({
                name: res[i].first_name + " " + res[i].last_name,
                value: res[i].id
            },
            )
        }
        // console.log(managers);
           managers.push({
                name: "no manager",
                value: null
            });
        
    });

    runSearch();
}

