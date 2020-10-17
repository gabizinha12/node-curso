const express = require("express")
const router = express.Router();
const User = require("./User")
const bcrypt = require("bcrypt")


router.get('/admin/users', async (req, res) => {
    User.findAll().then((users) => {
        res.render("admin/users/index", { users: users })
    })
})

router.get('/admin/users/create', async (req, res) => {
    res.render("admin/users/create")
})


router.post('/users/create', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;


    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {

            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/')
            }).catch((err) => {
                console.error(err)
            })
        } else {
            res.redirect('/admin/users/create')
        }
    })
})


module.exports = router;