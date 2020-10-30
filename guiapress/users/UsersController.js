const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcrypt");

router.get("/admin/users", async (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/");
  }
  User.findAll().then((users) => {
    res.render("admin/users/index", { users: users });
  });
});

router.get("/admin/users/create", async (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ where: { email: email } }).then((user) => {
    if (user == undefined) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);

      User.create({
        email: email,
        password: hash,
      })
        .then(() => {
          res.redirect("/admin/articles");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.redirect("/admin/users/create");
    }
  });
});

router.get("/login", (req, res) => {
  res.render("admin/users/login");
});

router.post("/authenticate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } }).then((user) => {
    if (user != undefined) {
      const correct = bcrypt.compareSync(password, user.password);
      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email,
        };
        res.json(req.session.user);
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
