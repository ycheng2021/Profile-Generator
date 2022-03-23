// generates all the cards and the main html documents
const generateManagerCard = (manager) => {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${manager.getName()}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"> ID: ${manager.getId()}</li>
        <li class="list-group-item"> Email: <a href='mailto:${manager.getEmail()}'>${manager.getEmail()}</li>
        <li class="list-group-item"> Office Number: ${manager.getOfficeNumber()}</li>
    </ul>
    </div>
    `
}

const generateEngineerCard = (engineer) => {

}

const generateInternCard = (intern) => {

}

const baseHtml = (htmlData) => `
BASE HTML CONTENT HERE

${createHtmlData()}
`


module.exports = {
    generateManagerCard,
    generateEngineerCard,
    generateInternCard,
    baseHtml
}