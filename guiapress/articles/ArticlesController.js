const express = require("express");
const router = express.Router();


router.get("/articles", (req,res) => {
    res.send("Rota configurada")
})

router.get("/admin/articles/new", (req,res) => {
    res.send("rota configurada")
})

module.exports = router;