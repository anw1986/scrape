const axios = require('axios');
const cheerio = require('cheerio')
const db=require('../models')

module.exports = (app) => {

    app.get('/', (req, res) => {

        db.Article.find({}).then(function(response){

            res.render("index",{news:response})
        })
    })

    app.get('/articles/saved', (req, res) => {
        res.render("savedarticles")
    })

    app.delete('/api/clear',(req,res)=>{
        db.Article.deleteMany({}).then(response=>res.send('database cleared'))
    })

    app.post('/api/save',(req,res)=>{
      console.log('working')  
    })

    app.get('/scrape', (req, res) => {

        axios.get('https://finance.yahoo.com').then((response) => {

            var $ = cheerio.load(response.data)
            var result = {}

            $(".Cf").each((i, element) => {
                var title = $(element).find("h3").text()
                const postUrl = $(element).find('a').attr('href')
                const image=$(element).find("img").attr('src')
                const subnews=$(element).find('p').text()

                if(title && postUrl && image&& subnews){

                    result.title= title;
                    result.subnews=subnews;
                    result.image=image;
                    result.postUrl=`https://finance.yahoo.com${postUrl}`
                    result.saved=false

                    db.Article.create(result).then(dbArticle=>{
                        console.log(dbArticle)
                    }).catch(function(err){
                        console.log(err)
                    })

                    // result.push({
                    //     title:title,
                    //     subnews:subnews,
                    //     image:image,
                    //     postUrl : "https://finance.yahoo.com" +postUrl
                    // })
                }
            })

            // res.json(results)
            // res.render("index",{news:results})
            // res.send(results)
            res.send('Data has beem scraped')
        })
    })

}