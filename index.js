const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path')

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// empty array for the generated HTML to be pushed into
const TeamHtmlArray = [];

function createHtmlData() {
    return TeamHtmlArray.join("")
}

// questions specifically for managers
const managerQuestions = [
    { 
        type: 'input',
        name: 'name',
        message: 'What is the manager\'s\ number?',
    },
    {

    },
];

// questions specifically for engineers
const engineerQuestions = [

];

// questions specifically for interns
const internQuestions = [

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
                    return generateHtml;
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
}

function createIntern(){
    inquirer
        .prompt(internQuestions)
}

function generateHtml(fileName, data){
    fs.writeFile(fileName, createHtmlData(data), (err) =>
    err ? console.log(err) : console.log("Success!")) 
}

function init() {
  createManager();
  createEngineer();
  createIntern();
};

init();