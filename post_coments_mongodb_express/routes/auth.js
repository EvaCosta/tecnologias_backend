const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Pessoa = require('../models/pessoa');

router.post('/signup', (req, res) => {
    const { name, email, senha, username, comentario } = req.body;

    Pessoa.findOne({ $or: [{ email }, { username }, { comentario }] })
        .then(doc_pessoa => {
            if (doc_pessoa) {
                return res.status(400).json({ error: "Nome de usuário, e-mail ou comentário já cadastrado no sistema" });
            } else {
                const novo_registro_pessoa = new Pessoa({
                    name,
                    email,
                    senha,
                    username,
                    comentario
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(novo_registro_pessoa.senha, salt, function (err, hash) {
                        if (err) throw err;
                        novo_registro_pessoa.senha = hash;

                        novo_registro_pessoa
                            .save()
                            .then(p => res.json(p))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => console.log(err));
});

router.get('/', (req, res) => res.json({ test: "Acesso permitido" }));

module.exports = router;
