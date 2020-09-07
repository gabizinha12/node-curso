const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const app = express();
app.set('view engine', 'ejs'); // View Enginw


// Database
connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados");
}).catch((erro) => {
    console.log(erro);
});



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function (req,res){
  Pergunta.findAll({raw:true, order: [
      ['id', 'DESC']
  ]}).then((perguntas) => {
    res.render("index", {
        perguntas: perguntas
    });
})
});


app.get("/perguntar", function(req,res) {
    res.render("perguntar");
});


app.get("/pergunta/:id", function(req, res) {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
     if(pergunta != undefined) {
     res.render("pergunta", {
         pergunta: pergunta
     });
     }else {
       res.redirect("/");
     }
    });
});


app.post("/salvarpergunta", function(req,res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
   Pergunta.create({
       titulo: titulo,
       descricao: descricao
   }).then(()=> {
      res.redirect("/");
   });
});


app.post("/responder", function(req, res) {
   var corpo = req.body.corpo;
   var perguntaId = req.body.pergunta;
   Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
   }).then(() => {
      res.redirect("/pergunta"+perguntaId)
   });
});

app.listen(8080, () => {
    console.log("Servidor rodando!")
});