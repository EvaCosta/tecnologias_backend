const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para analisar dados de formulário HTML
app.use(express.urlencoded({ extended: true }));

// Middleware para analisar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.post('/healthcheck', (req, res) => {
    res.status(200).json('Servidor está online e funcionando corretamente.');
});

app.get('/whatsapp', (req, res) => {
    // Extrair o número de telefone da query string
    let phoneNumber = req.query.phone;

    if (phoneNumber.startsWith(' 55')) {
        // Adiciona o "+" ao número de telefone
        phoneNumber = '+' + phoneNumber.replace(/\s/g, '');;
    }
    // Regex para validar número de telefone brasileiro (com ou sem "+"), desconsiderando espaços em branco
    const telefoneRegex = /^(\+55)?\s*\d{2}\s*9\s*\d{8}$/;

    // Verificar se o número de telefone está no formato correto
    if (telefoneRegex.test(phoneNumber)) {
        // Redirecionar para o WhatsApp com o número de telefone como parâmetro
        res.redirect(`https://wa.me/${phoneNumber}`);
    } else {
        // Se o número de telefone não estiver no formato correto, retornar um erro
        res.status(400).send('Número de telefone inválido');
    }
});

app.get('/jogo', (req, res) => {
    // Extrair o ID da URL usando regex
    const match = req.url.match(/\/jogo\?id=(\d+)/);

    // Verificar se houve correspondência e se o ID é numérico
    if (match && match[1] && /^\d+$/.test(match[1])) {
        // Se o ID for válido, enviar os detalhes do jogo correspondente
        const gameId = match[1];
        res.sendFile(path.join(__dirname, 'public', '/games-details.html'));
    } else {
        // Se a URL não contiver um ID numérico, retornar um erro 400
        res.status(400).send('ID de jogo inválido na URL');
    }
});


// Rota para lidar com solicitações POST do formulário de contato
app.post('/contact', (req, res) => {
    const { name, surname, email, subject, message } = req.body;

    const responseData = {
        message: 'Sua mensagem foi recebida com sucesso!',
        data: {
            name,
            surname,
            email,
            subject,
            message
        }
    };

    res.status(200).json(responseData);
});


// Rota para página 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
