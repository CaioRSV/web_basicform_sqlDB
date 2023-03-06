const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { readFile } = require('fs').promises;

const ejs = require('ejs');

const db = require('./db')

app.set('view engine', 'ejs');


app.use(express.json());

app.use(express.urlencoded());

app.use(express.static('public'));

app.get('/', async (request, response) => {

    //response.send( await readFile('./index.html', 'utf8') );
    response.redirect('/form');

});

app.get('/form', async (request, response) => {
    response.send( await readFile('./index2.html', 'utf8') );
    db.seeTable();

});

app.get('/seeDB', async (req, res) => {
    const infoTable = await db.seeTable();
    let part1 = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel ="stylesheet" href="style.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <script src="./index.js"></script>
      <title>Dados do BD</title>
    </head>
    <body class="bg-dark text-success">
    
    <h2 class="h2 d-flex align-items-center justify-content-center">Rows do BD</h2>
    <p class="d-flex align-items-center justify-content-center ">Esses são os adicionados até então:</p>
    
    <div class="container mt-4">    
    <div class="h3">`;
    let part2 = `
    <button type = "button" class= "btn btn-light"onclick="location.href='/form'">Voltar</button>
    </div>
    </div>
    </body>
    </html>`;
    res.send(part1+infoTable+part2);
});

app.post('/formPost', async (req,res)=>{

    console.log(req.body);
    const nameInp = req.body.name;
    const ageInp = parseInt(req.body.age);
    db.insertTable(nameInp, ageInp);
    res.redirect('/form');
});


app.listen(port, () => console.log(`Disponível em: http://localhost:3000`))