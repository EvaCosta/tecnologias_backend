const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    comentario: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Pessoa', PessoaSchema);
