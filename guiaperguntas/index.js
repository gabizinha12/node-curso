const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const app = express();
app.set('view engine', 'ejs');

connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados");
}).catch((erro) => {
    console.log(erro);
});



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function (req,res){
   res.render("index");
});


app.get("/perguntar", function(req,res) {
    res.render("perguntar");
});


app.post("/salvarpergunta", function(req,res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido  "  + titulo +  " "   + descricao);
});

app.listen(8080, () => {
    console.log("Servidor rodando!")
});