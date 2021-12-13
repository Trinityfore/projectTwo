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
            img: 'https://images.unsplash.com/photo-1639368216157-33c8fdd3c7b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        },
        {
            title: 'other test',
            entry: 'hello',
            business: 'my house',
            img: 'https://images.unsplash.com/photo-1606513792555-7dc667e49911?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
        },
        {
            title: 'mike',
            entry: 'hello',
            business: 'my house',
            img: 'https://images.unsplash.com/photo-1637563843021-cb6648e57e97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
        },
        {
            title: 'other other test',
            entry: 'hello',
            business: 'my house',
            img: 'https://images.unsplash.com/photo-1629745572676-e9e71631a61f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
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