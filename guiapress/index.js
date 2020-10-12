const express = require("express")
const bodyParser = require("body-parser");
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const Article = require("./articles/Article")
const Category = require("./categories/Category")
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

app.use("/", categoriesController)
app.use("/", articlesController)


app.get("/", (req,res) => {
    Article.findAll().then((articles) => {

      Category.findAll().then((categories) => {
        res.render("index", {articles: articles, categories: categories})

      })
    })
});

app.get('/:slug', (req,res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then((article) => {
        if(article != undefined) {
            Category.findAll().then((categories) =>  {
                res.render('article', {article: article, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch((err) => {
        res.redirect('/')
    })
})

app.get('/category/:slug', (req,res) => {
    const slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Article}]
    }).then(category  => {
        if(category != undefined) {
            Category.findAll().then(categories => {
             res.render('index', {articles: category.articles, categories: categories})
            }) 

        } else {
            res.redirect('/')
        }
    }).catch(e => {
        console.error(e)
        res.redirect('/')
    })
})


app.listen(8080, () => {
    console.log("O servidor está rodando")
});