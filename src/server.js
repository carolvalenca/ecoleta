const express = require('express')

const server = express()

//pegar o db
const db = require('./database/db')

//configurar pasta publica
server.use(express.static('public'))

//configurar o uso do req.body
server.use(express.urlencoded({ extended:true }))

//utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//configurar caminhos da aplicaçao
server.get('/', (req, res) => {
    return res.render('index.html')
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {
    const query = `INSERT INTO places (image, name, address, address2, state, city, items) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`

    const formValues = req.body
    const values = [
        formValues.image,
        formValues.name,
        formValues.address,
        formValues.address2,
        formValues.state,
        formValues.city,
        formValues.items]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
        } 
        console.log('Cadastrado com sucesso')
        console.log(this)

        res.render('create-point.html', { saved: true })
    
    }

    db.run(query, values, afterInsertData)

})

server.get('/search', (req, res) => {
    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render('search-results.html', { total: 0 })

    } 

    //pegar os dados da tabela 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) console.log(err)

        const total = rows.length
        return res.render('search-results.html', { places: rows, total })
    })
})

server.listen(3000)