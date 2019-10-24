const axios = require('axios');
const cheerio = require('cheerio')
const db = require('../models')

module.exports = (app) => {

    // get all articles from the database on the homepage
    app.get('/', (req, res) => {
        db.Article.find({
            saved: false
        }) .then(function (response) {
            res.render("index", {
                news: response
            })
        })
    })

    app.get('/articles/saved', (req, res) => {
        res.render("savedarticles")
    })

    app.get('/saved', (req, res) => {
        db.Article.find({
            saved: true
        }).populate('note').then(function (response) {
        //    console.log(response[0].note)
            res.render("savedarticles", {
                news: response
            })
        })
    })

    // clear all articles
    app.delete('/api/clear', (req, res) => {
        db.Article.deleteMany({}).then(response => res.send('database cleared'))
    })

    // move article to save
    app.put('/api/save/:id', (req, res) => {
        var articleId = req.params.id;
        db.Article.findByIdAndUpdate(articleId, {
            saved: true
        }, function (err, response) {
            if (err) {
                console.log(err)
            }
        }).then(dbupdate => {
            console.log(dbupdate)
            res.send('record updated')
        })
    })

    // remove saved article route
    app.put('/api/remove/:id', (req, res) => {
        var articleId = req.params.id;
        db.Article.findByIdAndUpdate(articleId, {
            saved: false
        }, function (err, response) {
            if (err) {
                console.log(err)
            }
        }).then(dbupdate => {
            console.log(dbupdate)
            res.send('record updated')
        })
    })

    // get data
    app.get('/scrape', (req, res) => {

        axios.get('https://finance.yahoo.com').then((response) => {

            var $ = cheerio.load(response.data)
            var result = {}

            $(".Cf").each((i, element) => {
                var title = $(element).find("h3").text()
                const postUrl = $(element).find('a').attr('href')
                const image = $(element).find("img").attr('src')
                const subnews = $(element).find('p').text()

                if (title && postUrl && image && subnews) {

                    result.title = title;
                    result.subnews = subnews;
                    result.image = image;
                    result.postUrl = `https://finance.yahoo.com${postUrl}`
                    result.saved = false

                    db.Article.create(result).then(dbArticle => {
                        console.log(dbArticle)
                    }).catch(function (err) {
                        console.log(err)
                    })

                }
            })

            res.send('Data has beem scraped')
        })
    })

    // post note route
    app.post('/article/note', (req, res) => {
        db.Note.create(req.body).then(dbArticle => {
                return db.Article.findOneAndUpdate({_id:req.body.article},{$push:{note:dbArticle._id}},{new:true})
            }).then(function(dbResponse){
                res.json(dbResponse)

        })

    })

    // delete comments
    app.delete('/api/comment/:id', (req, res) => {
        db.Note.deleteOne({_id:req.params.id},function(err,dbRemoveNote){
            console.log(dbRemoveNote)
            res.json(dbRemoveNote)
        })
    })

}