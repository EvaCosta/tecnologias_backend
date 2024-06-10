const express = require("express")

const app = express();

let port = 3000;

app.get('/', (req, res)=>{
    res.send("Olá! Seja bem-vindo!");
})

app.get('/sobre', (req, res)=>{
    res.send("<h1>Você está agora numa página sobre!<br></h1><p>Paragrafo aqui</p>");
})

app.get('/ab[0-9]cd', (req, res)=>{
    res.send("Essa é uma expressão regular");
})

let params_module = require('./params.js');
app.use("/", params_module);

app.post('/teste_post', (req, res)=>{
    res.send("Voce acessou essa pagina via método post");
})

app.post('/json', (req, res)=>{
    res.status(200).json({usuario: "lucas", id: 123456});
})

app.get('*', (req, res)=>{
    res.send("Link invalido: 404");
})


app.listen(port, ()=>{
    console.log(`Escutando na porta ${port}`);
})