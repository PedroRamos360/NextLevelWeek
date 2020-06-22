const sqlite3 = require('sqlite3').verbose();

// objeto que irá fazer operação no banco de dados
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;
// operações com o banco de dados
db.serialize(() => {
    // // 1 Criar uma tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT 
    //     );
    // `) // Último elemento NÃO ACEITA vírgula
    // // 2 Inserir dados
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `;

    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardima América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ];

    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("Cadastrado com sucesso");
    //     console.log(this);
    // };

    // db.run(query, values, afterInsertData);

    // 3 Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("Aqui estão seus registros:");
    //     console.log(rows);
    // });

    // 4 Deletar um dado da tabela
    // db.run(`DELETE FROM places`, function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("Registro deletado com sucesso");
    // });
});
