const express = require('express')
const app = express()
const port = 3000
const config = {
    host:'db',
    user: 'root',
    password : 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `insert into people (name) values ('Rodrigo')`;
connection.query(sql);
connection.end();



app.get('/', (req, res) => {
    res.send("<h1>Full cycle nodejs 1</h1>")
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port )
})