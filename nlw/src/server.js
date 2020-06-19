// Criação do server com express
const express = require('express');
const server = express();

// Acessando o banco de dados
const db = require("./database/db");

// configurar pasta pública
server.use(express.static("public"));

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }));

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
    return res.render("create-point.html");
});

server.post("/save-point", (req, res) => {
    // req.body: O corpo do formulário
    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }
        console.log(values);
        return res.send("ok");
    };
    db.run(query, values, afterInsertData);
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