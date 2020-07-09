const sqlite3 = require('sqlite3').verbose()

//criar o objeto que ira fazer as operaçoes do banco de dados
const path = require('path')
const dbPath = path.resolve(__dirname, 'database.db')
const db = new sqlite3.Database(dbPath)

module.exports = db


//utilizar o objeto de banco de dados, para nossas operaçoes
// db.serialize(() => {
//     //criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

     //inserir dados na tabela
    // const query = `INSERT INTO places (image, name, address, address2, state, city, items) 
    // VALUES (?, ?, ?, ?, ?, ?, ?);`

    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     "Colectoria",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis, Papelão"
    // ]

    // function afterInsertData(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('Cadastrado com sucesso')
    //         console.log(this)
    //     }
    // }

    // db.run(query, values, afterInsertData)

//     //consultar os dados da tabela
    // db.all('SELECT * FROM places', function(err, rows) {
    //     if (err) console.log(err)
    //     console.log(rows)
    // })

// db.run('DELETE FROM places WHERE id = ?', [5], function(err) {
//     if (err) console.log(err)
//     console.log('Deletado com sucesso!')
// })


// })
