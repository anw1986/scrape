const axios = require('axios');
const cheerio = require('cheerio')

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render("index")
    })

    app.get('/articles/saved', (req, res) => {
        res.render("savedarticles")
    })


    app.get('/scrape', (req, res) => {

        axios.get('https://finance.yahoo.com').then((response) => {

            var $ = cheerio.load(response.data)
            var results = []

            $(".Cf").each((i, element) => {
                var title = $(element).find("h3").text()
                const postUrl = $(element).find('a').attr('href')
                const image=$(element).find("img").attr('src')
                const subnews=$(element).find('p').text()

                if(title && postUrl && image&& subnews){

                    results.push({
                        title:title,
                        subnews:subnews,
                        image:image,
                        postUrl : "https://finance.yahoo.com" +postUrl
                    })
                }
            })

            // res.json(results)
            res.render("index",{news:results})
        })
    })

}