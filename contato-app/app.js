const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da pasta pública
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página de contato
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Rota para processar o formulário de contato
app.post('/contato', (req, res) => {
    const { nome, email, comentarios } = req.body;
    console.log(`Nome: ${nome}, E-mail: ${email}, Comentários: ${comentarios}`);
    res.send('Formulário recebido com sucesso!');
});

// Middleware para tratar erros 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
