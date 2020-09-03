var http = require("http")

http.createServer(function(req,res) {
    res.end('Olá mundo')
}).listen(8181)
console.log("Meu servidor rodando")