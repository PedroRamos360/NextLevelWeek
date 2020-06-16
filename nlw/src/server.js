// Criação do server com express
const express = require('express');
const server = express();

// Acessando o banco de dados
const db = require("./database/db");

// configurar pasta pública
server.use(express.static("public"));

// utilizar template engine
const nunjunks = require('nunjucks');
nunjunks.configure('src/views', {
    express: server,
    noCache: true,
});

server.get("/", (req, res) => { // req = requisição (pergunta), res = resposta
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {
    // req.query: Query Strings enviados para a URL
    console.log(req.query);
    return res.render("create-point.html");
});

server.get("/search-results", (req, res) => {
    // pegar dados do db
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err);
        }
        const total = rows.length;
        return res.render("search-results.html", { places: rows, total });
    });
});


// ligar servidor
server.listen(3000);