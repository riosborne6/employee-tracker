const mysql = require('mysql2');
const inquirer = require('inquirer');
require(`console.table`)

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
        if (answers.action === "view all departments") {
            vialdep();
        }
        if (answers.action === "view all employees") {
            vialemp();
        }
        if (answers.action === "add a role") {
            addarole();
        }
        if (answers.action === "view all roles") {
            vialrole();
        }
        if (answers.action === "add an employee") {
            addemp();
        }
        if (answers.action === "update an employee role") {
            upemp();
        }
    });
}

menu();

function departmento() {
    inquirer.prompt({
        type: "input",
        name: "dept",
        message: "What is the name of the new department",
    })
        .then(({ dept }) => {
            db.query(`INSERT INTO Department (name) VALUES(?)`, [dept], (err, result) => {
                if (err) {
                    console.log(err);
                }
                menu();
            });
        })
}

function vialdep() {
    db.query(`SELECT * FROM Department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        menu();
    });
}


function getEmp() {
    return db.promise().query('SELECT * FROM Employee')
}

function vialemp() {
    db.query(`SELECT * FROM Employee`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        menu();
    })
}

function vialrole() {
    db.query(`SELECT * FROM Role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        menu();
    });
}

function getRoles() {
    return db.promise().query('SELECT * FROM Role')
}

function addarole() {
    inquirer.prompt([
        {
            type: "input",
            name: "addRole",
            message: "What is the role?",
        },
        {
            type: "input",
            name: "addSalary",
            message: "What is the salary?",
        },
        {
            type: "input",
            name: "addDepartment_ID",
            // choices: []
            message: "What is the department ID?",
        }])
        .then(({ addRole, addSalary, addDepartment_ID }) => {
            console.log(addRole, addSalary, addDepartment_ID)
            db.query(`INSERT INTO Role (title, salary, department_id) VALUES(?,?,?)`, [addRole, addSalary, addDepartment_ID], (err, result) => {
                if (err) {
                    console.log(err);
                }
                vialrole();
                menu();
            });
        })
}

function upemp() {
    getEmp().then((rows) => {
        let employeee = rows[0]
        let employeearray = employeee.map(({ id, first_name, last_name }) => {
            return {
                name: `${first_name} ${last_name}`,
                value: id
            }
        })
        getRoles().then((rows2) => {
            let rolee = rows2[0]
            let roleearray = rolee.map(({ id, title }) => {
                return {
                    name: title,
                    value: id
                }
            })
            return inquirer.prompt([{
                type: "list",
                name: "upemployee",
                choices: employeearray,
                message: "which employees role would you like to update?"
            },
            {
                type: "list",
                name: "uprole",
                choices: roleearray,
                message: "what role would you like to update the employee to?"
            }])
                .then(({ upemployee, uprole }) => {
                    let query_upemp = "UPDATE Employee SET role_id = ? WHERE id=?"
                    try {
                        db.promise().query(query_upemp, [uprole, upemployee])
                        menu();
                    } catch (error) {
                        console.log(error)
                    }
                });
        })
    })
}

function addemp() {
    inquirer.prompt({
        type: "input",
        name: "emp",
        message: "What is the name of the new employee",
    })
        .then(({ emp }) => {
            db.query(`INSERT INTO Employee (first_name, last_name) VALUES(?,?)`, [emp], (err, result) => {
                if (err) {
                    console.log(err);
                }
                menu();
            });
        })
}
