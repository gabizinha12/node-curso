const express = require("express");
const router = express.Router();
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require('slugify')


router.get("/admin/articles", (req,res) => {
    Article.findAll({include: [{model: Category, required: true}]}).then((articles => {
        res.render('admin/articles/index', {articles: articles})
    }))
})

router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})


router.post('/articles/save', (req,res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

router.get('/admin/articles/edit/:id', (req,res) => {
    const id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', {article: article, categories: categories})
            })
        } else {
            res.redirect('/admin/articles')
        }
    }).catch((e) => {
        res.redirect('/admin/articles')
        console.error(e)
    })
})


router.post('/articles/update', (req,res) => {
    const id = req.body.id;
    const title = req.body.title
    const body = req.body.body
    const category = req.body.category;
    Article.update({title: title, body: body, slug: slugify(title), category: category}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

router.get('/articles/page/:num', (req,res) => {
    let page = req.params.num;

   if(isNaN(page) || page == 1) {
        offset = 0
   } else {
       offset = (parseInt(page)- 1) * 4
   }


    Article.findAndCountAll(
        {
            limit: 4,
            offset: offset,
            order: [
                ['id', 'DESC']
            ]
        }
    ).then(articles => {
       let next;

       if(offset + 4 >= articles.count) {
            next = false;
       }  else {
           next = true;
       }



        let result = {
            page: parseInt(page),
            next: next,
            articles : articles
        }

      Category.findAll().then(categories => {
          res.render('admin/articles/page', {result: result, categories: categories})
      })


        res.json(result)
    })
})



router.post("/articles/delete", (req,res) => {
    var id = req.body.id;
    if(id != undefined) {
       if(!isNaN(id)) {
        Article.destroy({
            where: {
                id: id 
            }
        }).then(() => {
            res.redirect("/admin/categories")
        })
       } else {
        res.redirect("/admin/articles")
       }
    } else {
    res.redirect("/admin/articles")
    }
})



module.exports = router;