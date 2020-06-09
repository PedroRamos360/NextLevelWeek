const express = require('express');
const server = express();

server.get("/", (req, res) => { // req = requisição (pergunta), res = resposta
    res.send("Cheguei aqui");
});

// ligar servidor
server.listen(3000);