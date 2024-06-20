# Meu Projeto de Comentários

Este é um sistema web robusto para simulação de postagem de comentários em um site, armazenando essas informações em um banco de dados na nuvem utilizando MongoDB. Este projeto utiliza o framework Express.JS e MongoDB, implementa criptografia para senhas e trata erros 404.

## Funcionalidades

- Formulário de registro de usuário com campos: nome, e-mail, nome de usuário, senha e comentário.
- Armazenamento seguro de senhas usando bcrypt.
- Armazenamento de comentários no banco de dados MongoDB.
- Tratamento de erros para rotas inexistentes (erro 404).

## Estrutura do Projeto

```
meu_projeto/
├── config/
│   └── db.js
├── models/
│   └── pessoa.js
├── routes/
│   └── auth.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── index.html
│   └── 404.html
├── middlewares/
│   └── errorHandler.js
├── app.js
├── package.json
└── README.md
```

## Pré-requisitos

- Node.js
- MongoDB

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/meu_projeto.git
   cd meu_projeto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a URL do MongoDB no arquivo `config/db.js`:
   ```javascript
   module.exports = {
       mongoURL: "sua_url_do_mongodb"
   };
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

5. Abra o navegador e acesse `http://localhost:3000`.

## Uso

1. Preencha o formulário de registro com seu nome, e-mail, nome de usuário, senha e comentário.
2. Clique em "Enviar" para enviar o formulário.
3. Os dados serão armazenados no banco de dados MongoDB e a senha será criptografada.

## Rotas

- `GET /` - Exibe o formulário de registro.
- `POST /auth/signup` - Registra um novo usuário.
- `GET /*` - Exibe a página de erro 404 para rotas inexistentes.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)