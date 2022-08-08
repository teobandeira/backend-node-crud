// npm run devStart
const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors"); // auxilia na conexão do front com o backend 

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "flag112233@",
    database: "maxxidata_base"
});

app.use(cors());
app.use(express.json());

//-----------------------------
// Cadastra o Profissional
//-----------------------------
app.post('/cadastraProfissional', (req, res) => {

    const { nome, email, telefone, status_cadastro, tipo_profissional } = req.body;
    const data_cadastro = new Date();

    let SQL = "INSERT INTO profissionais(nome, email, telefone, situacao, id_tipo, data_cadastro ) VALUES ( ?,?,?,?,?,? )";
    db.query(SQL, [nome, email, telefone, status_cadastro, tipo_profissional, data_cadastro], (err, result) => {
        console.log(result);
    });

    res.json({ message: 'Formulário enviado com sucesso!' })
});

//-----------------------------
// Cadastra o Tipo
//-----------------------------
app.post('/cadastraTipo', (req, res) => {

    const { descricao, status_cadastro } = req.body;
    const data_cadastro = new Date();

    let SQL = "INSERT INTO profissionais_tipo(descricao, situacao, data_cadastro) VALUES ( ?,?,? )";
    db.query(SQL, [descricao, status_cadastro, data_cadastro], (err, result) => {
        console.log(result);
    });

    res.json({ message: 'Formulário enviado com sucesso!' })
});

//-----------------------------
// Listar Profissionais
//-----------------------------
app.get('/profissionais', (req, res) => {

    let SQL = "SELECT * FROM profissionais";
    db.query(SQL, (err, result) => {
        res.send(result);
    });

});

//-----------------------------
// Listar Tipos
//-----------------------------
app.get('/tipos', (req, res) => {

    let SQL = "SELECT * FROM profissionais_tipo";
    db.query(SQL, (err, result) => {
        res.send(result);
    });

});

app.get('/', (req, res) => {
    res.send("Servidor OK");
});

app.listen(3001, () => {
    console.log("Server rodando 3001");
});