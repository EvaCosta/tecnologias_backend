const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const db_access = require('./config/db').mongoURL;
const auth = require('./routes/auth');

const app = express();

mongoose.connect(db_access, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão ok!'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/auth/signup', (req, res) => {
    const { name, email, username, senha, comentario } = req.body;
    console.log(`Nome: ${name}, E-mail: ${email}, Nome de Usuário: ${username}, Comentário: ${comentario}`);
    res.send('Formulário recebido com sucesso!');
});

// Middleware para tratar erros 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const port = 3000;
app.listen(port, () => console.log(`Executando na porta ${port}`));
