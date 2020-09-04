const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/:nome/:lang", function (req,res){
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;
    var produtos = [{nome: "Doritos", preco: 3.14},
                    {nome: "Coca-Cola", preco: 5.00},
                    {nome: "Leite", preco: 1.45}
]   
    res.render('index',{
       nome: nome,
       lang: lang,
       msg: exibirMsg,
       produtos: produtos
   });
});

app.listen(8080, () => {
    console.log("Servidor rodando!")
});