const express = require("express")
const bodyParser = require("body-parser");
const connection = require("./database/database")
const app = express();


// View engine
app.set('view engine', 'ejs')

//Static
app.use(express.static('public'));


//Body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    }).catch((error) => {
        console.log(error)
    });



app.get("/", (req,res) => {
    res.render("index")
});

app.listen(8080, () => {
    console.log("O servidor está rodando")
});