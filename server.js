require('dotenv').config
const express=require('express')
const exphbs=require('express-handlebars')
const PORT=process.env.PORT||3000

const app =express()


// Middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static("public"))


// handlebars
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars')

require('./routes/htmlRoutes')(app)

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}/`)
})