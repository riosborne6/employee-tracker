const mysql = require('mysql2');
const inquirer = require('inquirer')

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'password',
        database: 'workforce'
    },
    console.log('Connected to the workforce database.')
);

// TODO: Create a function to initialize app
function menu() {
    inquirer.prompt({
        type: "list",
        name: "action",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        message: "What do you want to do?",
    }).then((answers) => {
        if (answers.action === "add a department") {
            departmento();
        }
    });
}

menu();

function departmento() {
    db.query(`INSERT INTO Department (name) VALUES(?)`, [], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
}
