const express = require('express');

const server = express();

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
    return res.render("create-point.html");
});

server.get("/search-results", (req, res) => {
    return res.render("search-results.html");
});


// ligar servidor
server.listen(3000);