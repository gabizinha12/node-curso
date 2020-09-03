const express = require("express")

const app = express();

app.get("/", function(req, res) {
   res.send("teste")
});

app.get("/blog/:artigo?", function(req,res) {
    var artigo = req.params.artigo;
    if(artigo) {
      res.send("Artigo  "  + artigo);
    }else {
        res.send("Bem vindo ao blog")
    }
});
app.get("/canal/youtube", function(req,res) {
    var canal = req.query["canal"]

    if(canal) {
        res.send(canal)

    }else {
     res.send("Nenhum canal fornecido")
    }
});

app.get("/ola/:nome/:empresa", function(req,res) {
    var nome = req.params.nome;
    var empresa = req.params.empresa;
    res.send("Ola " + nome + " " + empresa)
});



app.listen(4000,function(erro){
    if(erro) {
        console.log("Um erro ocorreu")
    } else {
        console.log("Servidor rodando com sucesso")
    }
})