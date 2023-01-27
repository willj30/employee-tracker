const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'mandalorian_db',
});


connection.connect(err => {
  if (err) throw err;
  console.log("WELCOME TO MANDALORE, THIS IS THE WAY!", );
  startMenu();
});


const startMenu = () => {
  inquirer.prompt({
      message: 'What would you like to explore today?',
      name: 'menu',
      type: 'list',
      choices: [ 
        'View all departments',
        'View all roles',
        'View all characters',
        'Add a department',
        'Add a role',
        'Add a character',
        'Update character role',
        'Exit',
      ],
    })
    .then(response => {
        switch (response.menu) {
        case 'View all departments':
          viewDepartment();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all characters':
          viewCharacters();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add a character':
          addCharacter();
          break;
        case 'Update character role':
          updateCharacter();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

const viewRoles = () => {
  connection.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

const viewCharacters = () => {
  connection.query(
    'SELECT characters.id, first_name, last_name, title, credits_salary, dept_name, manager_id FROM ((department JOIN roles ON department.id = roles.dept_id) JOIN characters ON roles.id = characters.role_id);',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startMenu();
    }
  );
};

const addDepartment = () => {
  inquirer.prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the new department name?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log('New Department Added!');
          startMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the new role title?',
      },
      {
        name: 'credits_salary',
        type: 'input',
        message: 'What is the credit salary for this role?',
      },
      {
        name: 'dept_id',
        type: 'input',
        message: 'What is the department ID number?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO roles (title, credits_salary, dept_id) VALUES (?, ?, ?)',
        [answer.title, answer.credits_salary, answer.dept_id],
        function (err, res) {
          if (err) throw err;
          console.log('New Role Added!');
          startMenu();
        }
      );
    });
};

const addCharacter = () => {
  inquirer.prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "What is the new character's first name?",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the new character's last name?",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "What is the new character's role id?",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "What is the new character's manager's Id?",
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO characters (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
        function (err, res) {
          if (err) throw err;
          console.log('New Character Added!');
          startMenu();
        }
      );
    });
};

const updateCharacter = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter character id',
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter new role id',
      },
    ])
    .then(answer => {
      connection.query(
        'UPDATE characters SET role_id=? WHERE id=?',
        [answer.role_id, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Character updated!');
          startMenu();
        }
      );
    });
};