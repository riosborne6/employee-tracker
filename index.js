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
        message: "What is the name of the new department",})
.then(({dept}) => {
    db.query(`INSERT INTO Department (name) VALUES(?)`, [dept], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
    menu();
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


function vialemp() {
    return db.promise().query('SELECT * FROM employee')
    // db.query(`SELECT * FROM Employee`, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.table(result);
    // });
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
.then(({addRole, addSalary, addDepartment_ID}) => {
    console.log(addRole, addSalary, addDepartment_ID)
    db.query(`INSERT INTO Role (title, salary, department_id) VALUES(?,?,?)`, [addRole, addSalary, addDepartment_ID] , (err, result) => {
        if (err) {
            console.log(err);
        }
       vialrole();
    });
    menu();
})
}

function upemp() {
vialemp().then((rows)=> {
    let employeee = rows[0]
    let employeearray = employeee.map(({id, first_name, last_name, role_id, manager_id}) => {
            return {
                name: `${first_name} ${last_name}`,
                value: id
              }
    })
    return inquirer.prompt({
        type: "list",
        name: "upemployee",
        choices: employeearray,
        message: "which employees role would you like to update?"})
.then(({upemployee}) => {
    console.log("update employee", upemployee)
    let query_upemp = "UPDATE Employee SET role_id = ? WHERE id=?"
    try {
        db.promise().query(query_upemp, [4, upemployee], (err, result) => {
            if (err) {
                        console.log(err);
                    }
                    console.log(result);
        })
    } catch (error) {
        console.log(error)
    }

    // db.promise().query(`SELECT role_id, FROM Employee WHERE (id=?)`, (upemployee), (err, result) => {
    //     
    });
    menu();
})
}


// function viewemp() {
//     db.query(`SELECT * FROM Employee`, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         let monkey = []
//         monkey.push(result)
//         return(monkey)
//     });
// }