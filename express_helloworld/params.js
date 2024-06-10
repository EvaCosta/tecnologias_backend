const express = require("express")
let router = express.Router();

router.get('/:param', (req, res)=>{
    res.send("Você informou o parâmetro" + req.params.param);
})

router.get('/user/:u/nome/:n', (req, res)=>{
    res.send("Você acessou informações do usuario " + req.params.u + "de nome " + req.params.n);
})

module.exports = router;