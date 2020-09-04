const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function (req,res){

});

app.listen(8080, () => {
    console.log("Servidor rodando!")
});