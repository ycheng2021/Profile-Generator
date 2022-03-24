const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path')

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const {
    generateManagerCard,
    generateEngineerCard,
    generateInternCard,
    baseHtml
} =  require('./src/htmlGen')


// empty array for the generated HTML to be pushed into
const TeamHtmlArray = [];

// questions specifically for managers
const managerQuestions = [
    { 
        type: 'input',
        name: 'name',
        message: 'What is the manager\'s\ name?',
        validate: function (answer) {
            if (answer.length < 1) {
                return "A valid name is required"
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the manager\'s\ ID?',
        validate: function (answer) {
            if (answer.length < 1 || isNaN(answer)) {
                // console.log("A valid ID is required")
                return "A valid ID is required"
            } else {
                return true;
            }
        }
    },
    { 
        type: 'input',
        name: 'email',
        message: 'What is the manager\'s\ email?',
        validate: function ValidateEmail(email){
            const mailformat = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
            if (mailformat.test(email)){
                return true;
            } else {
                return "A valid email is required"
            }
        }
    },
    { 
        type: 'input',
        name: 'officeNumber',
        message: 'What is the manager\'s\ office number?',
        validate: function (answer) {
            if (answer.length < 1 || isNaN(answer)) {
                return "A valid office number is required"
            } else {
                return true;
            }
        }
    }
];

// questions specifically for engineers
const engineerQuestions = [
    { 
        type: 'input',
        name: 'name',
        message: 'What is the engineer\'s\ name?',
        validate: function (answer) {
            if (answer.length < 1) {
                return "A valid name is required"
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the engineer\'s\ ID?',
        validate: function (answer) {
            if (answer.length < 1 || !isNaN(answer)) {
                return "A valid ID is required"
            } else {
                return true;
            }
        }
    },
    { 
        type: 'input',
        name: 'email',
        message: 'What is the engineer\'s\ email?',
        validate: function ValidateEmail(email){
            const mailformat = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
            if (mailformat.test(email)){
                return true;
            } else {
                return "A valid email is required"
            }
        }
    },
    { 
        type: 'input',
        name: 'github',
        message: 'What is the engineer\'s\ Github username?',
        validate: function (answer) {
            const usernameFormat = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)
            if (usernameFormat.test(answer)) {
                return true;
            } else {
                return "A valid Github username is required"
            }
        }
    }
];

// questions specifically for interns
const internQuestions = [
    { 
        type: 'input',
        name: 'name',
        message: 'What is the intern\'s\ name?',
        validate: function (answer) {
            if (answer.length < 1) {
                return "A valid name is required"
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the intern\'s\ ID?',
        validate: function (answer) {
            if (answer.length < 1 || isNaN(answer)) {
                return "A valid ID is required"
            } else {
                return true;
            }
        }
    },
    { 
        type: 'input',
        name: 'email',
        message: 'What is the intern\'s\ email?',
        validate: function ValidateEmail(email){
            const mailformat = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
            if (mailformat.test(email)){
                return true;
            } else {
                return "A valid email is required"
            }
        }
    },
    { 
        type: 'input',
        name: 'school',
        message: 'What is the intern\'s\ school?',
        validate: function (answer) {
            if (answer.length < 1) {
                return "A valid school is required"
            } else {
                return true;
            }
        }
    }
];

function mainMenu(){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'addedRole',
                Message: 'Would you like to add another member to the team?',
                choices: ['Manager', 'Engineer', 'Intern', 'I\'m\ Done'],
            },
        ])
        .then(answers => {
            switch(answers.addedRole) {
                case 'Manager':
                    return createManager();
                case 'Engineer':
                    return createEngineer();
                case 'Intern':
                    return createIntern();
                default: 
                    return generateHtml();
            }
        })
}

function createManager(){
    inquirer
        .prompt(managerQuestions)
        .then(({ name, id, email, officeNumber}) => {
            const manager =  new Manager(name, id, email, officeNumber)
            TeamHtmlArray.push(generateManagerCard(manager))
            mainMenu()
        })
}

function createEngineer(){
    inquirer
        .prompt(engineerQuestions)
        .then(({ name, id, email, github}) => {
            const engineer = new Engineer(name, id, email, github)
            TeamHtmlArray.push(generateEngineerCard(engineer))
            mainMenu()
        })
}

function createIntern(){
    inquirer
        .prompt(internQuestions)
        .then(({ name, id, email, school}) => {
            const intern = new Intern(name, id, email, school)
            TeamHtmlArray.push(generateInternCard(intern))
            mainMenu()
        })
}

function generateHtml(){
    fs.writeFile("./dist/index.html", baseHtml(TeamHtmlArray.join(" ")), (err) =>
    err ? console.log(err) : console.log("Success! Generated HTML file.")) 
}

function init() {
    mainMenu();
};

init();