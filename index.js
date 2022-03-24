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

function createHtmlData() {
    return TeamHtmlArray.join(" ")
}

// questions specifically for managers
const managerQuestions = [
    { 
        type: 'input',
        name: 'name',
        message: 'What is the manager\'s\ name?',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the manager\'s\ ID?'
    },
    { 
        type: 'input',
        name: 'email',
        message: 'What is the manager\'s\ email?',
    },
    { 
        type: 'input',
        name: 'officeNumber',
        message: 'What is the manager\'s\ office number?'
    }
];

// questions specifically for engineers
const engineerQuestions = [
    { 
        type: 'input',
        name: 'name',
        message: 'What is the engineer\'s\ name?',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the engineer\'s\ ID?'
    },
    { 
        type: 'input',
        name: 'email',
        message: 'What is the engineer\'s\ email?',
    },
    { 
        type: 'input',
        name: 'github',
        message: 'What is the engineer\'s\ Github username?'
    }
];

// questions specifically for interns
const internQuestions = [
    { 
        type: 'input',
        name: 'name',
        message: 'What is the intern\'s\ name?',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the intern\'s\ ID?'
    },
    { 
        type: 'input',
        name: 'email',
        message: 'What is the intern\'s\ email?',
    },
    { 
        type: 'input',
        name: 'school',
        message: 'What is the intern\'s\ school?'
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
    fs.writeFile("./dist/index.html", baseHtml(createHtmlData), (err) =>
    err ? console.log(err) : console.log("Success! Generated HTML file.")) 
}

function init() {
    mainMenu();
    createManager();
    createEngineer();
    createIntern();
};

init();