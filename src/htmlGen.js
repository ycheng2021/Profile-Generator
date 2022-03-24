// generates all the cards and the main html documents
const generateManagerCard = (manager) => {
    return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h2 class="card-title">${manager.getName()}</h2>
            <h5 class="role"><i class="fa-solid fa-mug-hot"></i>${manager.getRole()}</h5>
        </div>
        <div class="info">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> ID: ${manager.getId()}</li>
            <li class="list-group-item"> Email: <a href='mailto:${manager.getEmail()}'>${manager.getEmail()}</li>
            <li class="list-group-item"> Office Number: ${manager.getOfficeNumber()}</li>
        </ul>
        </div>
    </div>
    `
}

const generateEngineerCard = (engineer) => {
    return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h2 class="card-title">${engineer.getName()}</h2>
            <h5 class="role"><i class="fa-regular fa-glasses"></i>${engineer.getRole()}</h5>
        </div>
        <div class="info">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> ID: ${engineer.getId()}</li>
            <li class="list-group-item"> Email: <a href='mailto:${engineer.getEmail()}'>${engineer.getEmail()}</li>
            <li class="list-group-item"> Github: ${engineer.getGithub()}</li>
        </ul>
        </div>
    </div>
    `
}

const generateInternCard = (intern) => {
    return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h2 class="card-title">${intern.getName()}</h2>
            <h5 class="role"><i class="fa-regular fa-graduation-cap"></i>${intern.getRole()}</h5>
        </div>
        <div class="info">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> ID: ${intern.getId()}</li>
            <li class="list-group-item"> Email: <a href='mailto:${intern.getEmail()}'>${intern.getEmail()}</li>
            <li class="list-group-item"> School: ${intern.getSchool()}</li>
        </ul>
        </div>
    </div>
    `
}

const baseHtml = (htmlData) => `
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>A Basic HTML5 Template</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/all.css">
  <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg">
    <a class="navbar-brand" href="#">Team Profiles</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
        <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
        </li>
    </ul>
    </div>
    </nav>

    <div class="info-container">

${htmlData}
    
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>
`


module.exports = {
    generateManagerCard,
    generateEngineerCard,
    generateInternCard,
    baseHtml
}