const express = require('express');
const mongoose =require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const Revv = require('./models/review')
const methodOverride = require('method-override')
const reviewController = require('./controllers/reviews')


//database connection
mongoose.connect(process.env.DATABASE_URL )

const db= mongoose.connection
db.on('error', (err) => console.log(err.message + 'mongo no run'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

//mount middleware
app.use(express.urlencoded( { extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('public')) //css files, front end js etc


//seed route
app.get('/revv/seed',(req,res)=> {
    const data = [
        {
            title: 'test',
            entry: 'hello',
            business: 'my house',
        },
        {
            title: 'other test',
            entry: 'hello',
            business: 'my house',
        },
        {
            title: 'mike',
            entry: 'hello',
            business: 'my house',
        },
        {
            title: 'scott',
            entry: 'hello',
            business: 'my house',
        }
    ]
    Revv.deleteMany({}, (err,deleted) => {
      Revv.create(data, (err,item) => {
         res.redirect('/revv') 
      })  
    })
    
})

app.use('/', reviewController)

//listener
app.listen(PORT, () => {
    console.log('express is listening on ' + PORT)
});